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

  interface IApplication {
    decision: Decision
    whyBM: string
    projectIdea: string
    codeConduct: boolean
    termConditions: boolean
    optInEmail: boolean
    resume: string
    resumeVersion: number

    user?: ObjectId
    year?: number
    updatedAt?: string
  }

  interface IUser extends User {
    firstName: string
    lastName: string
    role: string
    hasFilledProfile: boolean
    majors: string[]
    gender: string
    levelOfStudy: string
    gradYear: string
    school: string
    age: number
    phone: string
    country: string
    applications: Record<string, Application>
  }
}
