import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const SLACK_WEBHOOK: string = process.env.SLACK_WEBHOOK || ''

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()

    // Extract 'type' from req
    const { type }: { type: string } = req.body

    if (type === 'url_verification') {
      // Slack is verifying the endpoint
      return res.status(StatusCodes.OK).json({ challenge: req.body.challenge })
    }

    if (type == 'event_callback') {
      // If a message is received, post it to Slack
      const { event } = req.body
      const { type, text }: { type: string; text: string } = event.type
      await axios.post(SLACK_WEBHOOK, {
        text: text,
      })
      return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
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
