/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import type Mongoose from 'mongoose'
import type { User } from 'next-auth'

type Infer<T> = T extends { lean: infer R } ? R : false
type Mapped<T, LeanedDoc, Doc> = T extends true
  ? Promise<LeanedDoc>
  : T extends false
  ? Promise<Doc>
  : never

// export enum Decision {
//   Pending,
//   Rejected,
//   Accepted,
//   Waitlisted,
// }

// export enum Gender {
//   Male,
//   Female,
//   Other,
// }

declare global {
  var mongoose: { conn: ?Mongoose; promise: ?Promise<Mongoose> }

  type ObjectId = Types.ObjectId

  // for optional leaning in function calls
  type LeanOption = { lean?: boolean }
  type LeanOptionResult<T, LeanedDoc, Doc> = Mapped<Infer<T>, LeanedDoc, Doc>

  // declare general interfaces for Application and User
  // then extends these interfaces to be document types

  enum Decision {
    Pending = 'Pending',
    Rejected = 'Rejected',
    Accepted = 'Accepted',
    Waitlisted = 'Waitlisted',
  }

  // any new fields should be included in models/Application
  interface IApplication {
    decision: Decision
    whyBM: string
    projectIdea: string
    codeConduct: boolean
    resume: string

    user?: ObjectId
    year?: number
  }

  interface IUser extends User {
    preferredName: string
    role: string
    hasFilledProfile: boolean
    major: string
    gender: string
    gradYear: string
    school: string
    is_18_or_up: boolean
    applications: Record<string, Application>
  }
}
