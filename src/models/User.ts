import { Schema, model, models } from 'mongoose'

import type { IApplication } from './Application'
import type { Model, Types } from 'mongoose'
import type { User } from 'next-auth'

enum Role {
  'Applicant',
  'Hacker',
  'Exec',
  'Sponsor',
}

export type Applications = Record<string, Types.ObjectId>

export interface IUser extends User {
  firstName: string
  lastName: string
  role: Role
  profile_info: boolean
  applications: Applications
  getApplicationByYear: (year: number) => Promise<IApplication>
  addApplication: (year: number, id: Types.ObjectId) => void
}

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: Role,
  },
  profile_info: Boolean,
  applications: {
    default: {},
    type: Map,
    of: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
    },
  },
})

// must load plugin before model creation
// we can't use a global plugin since we can't guarantee that it'll be loaded before model compilation
UserSchema.plugin(require('@/utils/store/leanObjectIdToString'))

UserSchema.methods.addApplication = function addApplication(
  year: number,
  id: Types.ObjectId
) {
  this.applications.set(String(year), id)
}

UserSchema.methods.getApplicationByYear = async function getApplicationByYear(
  year: number
) {
  return (await this.populate('applications.$*')).applications.get(String(year))
}

export default (models.User as Model<IUser>) || model<IUser>('User', UserSchema)
