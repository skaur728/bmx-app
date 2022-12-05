import { Schema, model, models } from 'mongoose'

import type { Document, LeanDocument, Model, Types } from 'mongoose'

enum Role {
  'Applicant',
  'Hacker',
  'Exec',
  'Sponsor',
}

interface IUserMethods {
  getApplication: (
    year?: number | string
  ) => Promise<IApplication | IApplication[] | null>
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {}

export interface IUserDocument extends Document<ObjectId, any, IUser> {}

export type LeanedUser = LeanDocument<IUser & { _id: Types.ObjectId }>

const UserSchema = new Schema<IUser, IUserModel>({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: Role,
  },
  hasFilledProfile: Boolean,
  majors: [String],
  gradYear: String,
  levelOfStudy: String,
  gender: String,
  age: Number,
  school: String,
  country: String,
  phone: String,
  applications: {
    type: Map,
    of: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
    },
  },
})

UserSchema.method(
  'getApplication',
  async function getApplication(this: IUserDocument, year: number | string) {
    try {
      const user = await this.populate<{
        applications: Map<string, IApplication>
      }>('applications.$*')

      if (!year) return user.applications

      if (!user.applications) return null

      return { [year]: user.applications.get(String(year)) }
    } catch (e) {
      return Promise.reject(e)
    }
  }
)

// must load plugin before model creation
// we can't use a global plugin since we can't guarantee that it'll be loaded before model compilation
UserSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default (models.User as IUserModel) ||
  model<IUserDocument, IUserModel>('User', UserSchema)
