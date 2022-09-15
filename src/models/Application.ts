import { Schema, model, models } from 'mongoose'
import type { User } from 'next-auth'

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

export interface IUser extends User {
  decision: string
  emailed_decision: boolean
  rsvp: boolean
  accepted_at: string
  checked_in_at: string
  school: string
  major: string
  grad_year: string
  first_name: string
  last_name: string
  resume: string
  phone: string
  gender: string
  github: string
  location: string
  is_first_hackathon: boolean
  why_bm: string
  project_idea: string
  is_18_or_up: boolean
  MLH_code_conduct: boolean
  checked_in: boolean
  points: number
}

const ApplicationSchema = new Schema<IUser>({
  decision: Decision,
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
  gender: Gender,
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
export default models.Application ||
  model<IUser>('Application', ApplicationSchema)
