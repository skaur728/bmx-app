import type { NextApiRequest, NextApiResponse } from 'next'
import to from 'await-to-js'
import dbConnect from '@/utils/store/dbConnect'
import { createUser, getUsers } from '@/controllers/user'

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
    const [error, users] = await to(getUsers())
    if (error) return res.status(500).send({ error })

    return res.send({ users })
  }
  return res.status(405).send({ message: 'Only POST & GET requests allowed' })
}
