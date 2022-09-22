import { Schema, model, models } from 'mongoose'

import type { Types } from 'mongoose'
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
  // email: string
  // password: string //needs to be hashed
  role: Role
  // confirmation_code: string
  profile_info: boolean
  application: Applications
}

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  // email: String,
  // password: String,
  role: Role,
  // confirmation_code: String,
  profile_info: Boolean,
  application: {
    type: Map,
    of: String,
  },
})

// must load plugin before model creation
UserSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default models.User || model<IUser>('User', UserSchema)
