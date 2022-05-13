import type { Document } from 'mongoose'
import { Schema, model, models } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
}

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
})

// must load plugin before model creation
UserSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default models.User || model<IUser>('User', UserSchema)
