import to from 'await-to-js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { getToken } from 'next-auth/jwt'

import { getUser, updateUser } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await dbConnect()

    const token = await getToken({ req })

    if (!token || !token.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED })

    const [error, user] = await to(getUser(token.id))
    if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }

    return res.send({ user })
  }

  if (req.method === 'PATCH') {
    await dbConnect()

    const token = await getToken({ req })

    if (!token || !token.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED })

    const { payload }: { payload: Partial<IUser> } = req.body
    const [error, user] = await to(
      updateUser({ id: <string>token.id, ...payload })
    )

    if (error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })

    return res.send({ user })
  }

  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
