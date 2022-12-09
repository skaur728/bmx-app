import to from 'await-to-js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { getToken } from 'next-auth/jwt'

import { updateApplicationByYear } from '@/controllers/application'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()

    const token = await getToken({ req })

    const { rsvp }: { rsvp: boolean } = req.body

    if (!token || !token.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED })

    if (rsvp === undefined)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: ReasonPhrases.BAD_REQUEST })

    const [error, application] = await to(
      updateApplicationByYear(token.id, 2023, { rsvp })
    )
    if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }

    return res.send({ application })
  }

  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
