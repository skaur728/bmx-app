import to from 'await-to-js'

import { createUser, findUserByEmail, getUsers } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req

  await dbConnect()

  if (method === 'POST') {
    const { firstName, lastName } = body

    const [error, user] = await to(createUser({ firstName, lastName }))
    if (error) return res.status(500).send({ error })
    return res.send({ user })
  }
  if (method === 'GET') {
    // If there is an email query parameter, search by that
    if ('email' in req.query) {
      const [error, user] = await to(
        findUserByEmail({ email: req.query.email as string })
      )
      if (error) return res.status(500).send({ error })

      return res.send({ user })
    } else {
      const [error, users] = await to(getUsers())
      if (error) return res.status(500).send({ error })

      return res.send({ users })
    }
  }
  return res.status(405).send({ message: 'Only POST & GET requests allowed' })
}
