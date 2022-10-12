import to from 'await-to-js'

import Application from '@/models/Application'
import User from '@/models/User'

import type {
  IApplicationDocument,
  LeanedApplication,
} from '@/models/Application'

export const createApplication = async (
  userId: ObjectId,
  application: IApplication
) => {
  const [findError, user] = await to(User.findById(userId).exec())
  if (findError || !user) {
    throw !user ? new Error('No user found') : findError!
  }

  // put in .env
  const year = 2023
  if (await user.getApplication(year)) {
    throw new Error('Application already exists')
  }

  const [creationError, app] = await to<IApplicationDocument, Error>(
    Application.create({ ...application, user })
  )
  if (creationError || !app) {
    throw !app ? new Error('No Application Created') : new Error(creationError)
  }

  return User.findByIdAndUpdate(userId, {
    $set: {
      [`applications.${year}`]: app._id,
    },
  }).exec()
}

export const getApplications = async (
  userId: ObjectId,
  year?: number | string
) => {
  const [findError, user] = await to(User.findById(userId).exec())
  if (findError || !user) {
    throw !user ? new Error('No user found') : findError!
  }

  // return promise so function caller handles errors
  return user.getApplication(year)
}

export const getApplicationById = <T extends LeanOption>(
  applicationId: ObjectId,
  options?: { lean: boolean }
): LeanOptionResult<T, LeanedApplication | null, IApplicationDocument | null> =>
  Application.findById(applicationId).lean(options?.lean).exec() as any
