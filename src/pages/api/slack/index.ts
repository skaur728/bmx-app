import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createAnnouncement,
  getAnnouncements,
} from '@/controllers/announcement'
import to from 'await-to-js'

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
      const { event } = req.body

      if (event.type === 'message' && event.channel_type === 'channel') {
        // If a message is received, store it on MongoDB
        // TODO: Store the 'text' field and timestamp
        const [error, _] = await to(createAnnouncement(event.text))
        if (error) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: error.message })
        }
        return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
      }
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST })
  }

  if (req.method === 'GET') {
    await dbConnect()

    const [error, announcements] = await to(getAnnouncements())
    if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }

    return res.send({ announcements })
  }

  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
