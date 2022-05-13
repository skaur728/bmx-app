import mongoose, { plugin } from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = globalThis.mongoose

if (!cached) {
  cached = { conn: null, promise: null }
  global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((_mongoose) => {
      console.log('connected to mongodb!')
      return _mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
