import { getUserByEmail, getUsers } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { getToken } from 'next-auth/jwt'

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  // Check if there are query params
  if ('email' in req.query) {
    // We are querying a user by email
    const user = await getUserByEmail({ email: req.query.email as string })
    res.status(StatusCodes.OK).json(user)
    return
  }

  // Otherwise, just list all of the users
  const allUsers = await getUsers()
  res.status(StatusCodes.OK).json(allUsers)
}

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


  if (req.method === 'GET') {
    await handleGet(req, res)
  } else {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
  }
}
