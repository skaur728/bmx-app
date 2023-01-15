import to from 'await-to-js'

import Announcement from '@/models/Announcement'

import type { IAnnouncementDocument } from '@/models/Announcement'

export const createAnnouncement = async (message: string) => {
  if (!message) {
    throw new Error('Message is required')
  }
  const [creationError, app] = await to<IAnnouncementDocument, Error>(
    Announcement.create({ message })
  )
  if (creationError || !app) {
    throw !app
      ? new Error('Announcement could not be created')
      : new Error(creationError)
  }
}

export const getAnnouncements = async () => {
  const [findError, announcements] = await to(
    Announcement.find({}).sort('createdAt').exec()
  )

  if (findError || !announcements) {
    throw !announcements ? new Error('No user found') : findError!
  }

  // return promise so function caller handles errors
  return announcements
}
