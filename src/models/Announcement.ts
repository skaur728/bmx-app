import { Schema, model, models } from 'mongoose'

import type { Document, LeanDocument, Model, Types } from 'mongoose'

interface IAnnouncementModel extends Model<IAnnouncement> {}

export interface IAnnouncementDocument extends Document<ObjectId, any> {}

export type LeanedAnnouncement = LeanDocument<
  IAnnouncement & { _id: Types.ObjectId }
>

const AnnouncementSchema = new Schema<IAnnouncement, IAnnouncementModel>(
  {
    message: String,
  },
  {
    timestamps: true,
  }
)

AnnouncementSchema.index({ createdAt: 1 })

AnnouncementSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default (models.Announcement as IAnnouncementModel) ||
  model('Announcement', AnnouncementSchema)
