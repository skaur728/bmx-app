import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

const SLACK_TOKEN: string = process.env.SLACK_TOKEN || ''

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()

    const { token, type }: { token: string; type: string } = req.body

    if (token !== SLACK_TOKEN) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
      })
    }

    if (type === 'url_verification') {
      // Slack is verifying the endpoint
      return res.status(StatusCodes.OK).json({ challenge: req.body.challenge })
    }

    if (type === 'event_callback') {
      // If a message is received, store it on MongoDB
      const { event } = req.body

      if (event.type === 'message' && event.channel_type === 'channel') {
        // TODO: Store the 'text' field
        return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
      })
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST })
  }
  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
