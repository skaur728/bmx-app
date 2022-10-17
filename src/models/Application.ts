import { Schema, model, models } from 'mongoose'

import type {
  Document,
  LeanDocument,
  Model,
  SchemaDefinitionProperty,
  Types,
} from 'mongoose'

interface IApplicationModel extends Model<IApplication> {}

export interface IApplicationDocument extends Document<ObjectId, any> {}

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
    enum: 'Pending' || 'Rejected' || 'Accepted' || 'Waitlisted',
  } as any as SchemaDefinitionProperty<Decision> | undefined,
  resume: String,
})

ApplicationSchema.plugin(require('@/utils/store/leanObjectIdToString'))

export default (models.Application as IApplicationModel) ||
  model('Application', ApplicationSchema)
