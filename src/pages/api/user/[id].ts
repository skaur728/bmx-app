import to from 'await-to-js'

import { deleteUser, getUser, updateUser } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    method,
    query: { id },
  } = req

  await dbConnect()

  if (method === 'PATCH') {
    const { payload }: { payload: Partial<IUser> } = body
    const [error, user] = await to(updateUser({ id: <string>id, ...payload }))
    if (error) return res.status(500).send({ error })
    return res.send({ user })
  }

  if (method === 'DELETE') {
    const [error, user] = await to(deleteUser({ id: <string>id }))
    if (error) return res.status(500).send({ error })

    return res.send({ user })
  }

  if (method === 'GET') {
    const [error, user] = await to(getUser(id, { lean: true }))
    if (error) return res.status(500).send({ error })

    return res.send({ user })
  }

  return res
    .status(405)
    .send({ message: 'Only GET/PATCH/DELETE requests allowed' })
}

export default handler
