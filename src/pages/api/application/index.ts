import to from 'await-to-js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { getToken } from 'next-auth/jwt'

import { createApplication, getApplications } from '@/controllers/application'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()

    const token = await getToken({ req })

    const { application }: { application?: IApplication } = req.body

    if (!token || !token.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED })

    if (!application)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: ReasonPhrases.BAD_REQUEST })

    const [error, app] = await to(createApplication(token.id, application))
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: error.message })
    }
    return res.send({ application: app })
  }
  if (req.method === 'GET') {
    await dbConnect()

    const token = await getToken({ req })

    if (!token || !token.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED })

    const { year }: { year?: string } = req.query

    const [error, applications] = await to(getApplications(token.id, year))
    if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }

    return res.send({ applications })
  }

  return res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED })
}

export default handler
