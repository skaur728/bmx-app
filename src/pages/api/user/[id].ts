import to from 'await-to-js'

import { deleteUser, getUser, updateUser } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401).end()
    return
  }

  const {
    body,
    method,
    query: { id },
  } = req

  await dbConnect()

  if (method === 'PATCH') {
    const { firstName, lastName } = body

    const [error, user] = await to(
      updateUser({ id: <string>id, firstName, lastName })
    )
    if (error) return res.status(500).send({ error })
    return res.send({ user })
  }

  if (method === 'DELETE') {
    const [error, user] = await to(deleteUser({ id: <string>id }))
    if (error) return res.status(500).send({ error })

    return res.send({ user })
  }

  if (method === 'GET') {
    const [error, user] = await to(getUser({ id: <string>id }))
    if (error) return res.status(500).send({ error })

    return res.send({ user })
  }

  return res
    .status(405)
    .send({ message: 'Only GET/PATCH/DELETE requests allowed' })
}
