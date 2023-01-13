import to from 'await-to-js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { getToken } from 'next-auth/jwt'

import { updateApplicationByYear } from '@/controllers/application'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()

    // Extract 'type' from req
    const { type }: { type: string } = req.body

    if (type === 'url_verification') {
      // Slack is verifying the endpoint
      return res.status(StatusCodes.OK).json({ challenge: req.body.challenge })
    }

    return res.status(StatusCodes.OK).json({ message: 'OK' })
  }
  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
