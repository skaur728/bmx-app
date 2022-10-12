import { Schema, model, models } from 'mongoose'

import type { Document, LeanDocument, Model, Types } from 'mongoose'

enum Decision {
  'Rejected',
  'Denied',
  'Waitlisted',
}
enum Gender {
  'Male',
  'Female',
  'Other',
}

interface IApplicationModel extends Model<IUser> {}

export interface IApplicationDocument extends Document<ObjectId, any, IUser> {}

export type LeanedApplication = LeanDocument<
  IApplication & { _id: Types.ObjectId }
>

const ApplicationSchema = new Schema<IApplication, IApplicationModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },

  decision: {
    type: String,
    enum: Decision,
  },
  emailed_decision: Boolean,
  rsvp: Boolean,
  accepted_at: String,
  checked_in_at: String,
  school: String,
  major: String,
  grad_year: String,
  first_name: String,
  last_name: String,
  resume: String,
  phone: String,
  gender: {
    type: String,
    enum: Gender,
  },
  github: String,
  location: String,
  is_first_hackathon: Boolean,
  why_bm: String,
  project_idea: String,
  is_18_or_up: Boolean,
  MLH_code_conduct: Boolean,
  checked_in: Boolean,
  points: Number,
})

ApplicationSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default (models.Application as IApplicationModel) ||
  model('Application', ApplicationSchema)
