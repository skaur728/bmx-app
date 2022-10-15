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

  interface IApplication {
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

    user?: ObjectId
    year?: number
  }

  interface IUser extends User {
    preferredName: string
    role: string
    hasFilledProfile: boolean
    applications: Record<string, Application>
  }
}
