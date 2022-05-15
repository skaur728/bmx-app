/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import type Mongoose from 'mongoose'

declare global {
  var mongoose: { conn: ?Mongoose; promise: ?Promise<Mongoose> }
}
