import { getUserByEmail, getUsers } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiResponse } from 'next'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { NextApiRequestWithUser, withAuthenticatedUser } from '@/api-middleware/withAuthenticatedUser'

async function handleGet(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect()

  console.log('existing user:')
  console.log(req.user)

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

async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handleGet(req, res)
  } else {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
  }
}

export default withAuthenticatedUser(handler)
