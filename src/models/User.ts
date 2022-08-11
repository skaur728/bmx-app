import { Schema, model, models } from 'mongoose'
import type { User } from 'next-auth'

export interface IUser extends User {
  // Email is the userID?
  firstName: string
  lastName: string
  dob: Date
  phone: string
  school: string
  gradYear: number
  major: string
  github: string
  linkedin: string
}

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  dob: Date,
  phone: String,
  school: String,
  gradYear: Number,
  major: String,
  github: String,
  linkedin: String,
})

// must load plugin before model creation
UserSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default models.User || model<IUser>('User', UserSchema)
