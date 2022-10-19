import to from 'await-to-js'

import {
  getApplicationById,
  updateApplication,
} from '@/controllers/application'
import dbConnect from '@/utils/store/dbConnect'

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    method,
    query: { id },
  } = req

  await dbConnect()

  if (method === 'PATCH') {
    const { payload }: { payload: Partial<IApplication> } = body
    const [error, user] = await to(
      updateApplication({ id: <string>id, ...payload })
    )
    if (error) return res.status(500).send({ error })
    return res.send({ user })
  }

  // TODO maybe for withdrawing
  // if (method === 'DELETE') {
  //   const [error, application] = await to(withdrawApplication({ id: <string>id }))
  //   if (error) return res.status(500).send({ error })

  //   return res.send({ application })
  // }

  if (method === 'GET') {
    const [error, application] = await to(
      getApplicationById(id, { lean: true })
    )
    if (error) return res.status(500).send({ error })

    return res.send({ application })
  }

  return res
    .status(405)
    .send({ message: 'Only GET/PATCH/DELETE requests allowed' })
}

export default handler
