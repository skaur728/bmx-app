import type { Document } from 'mongoose'
import type { DefaultUser } from 'next-auth'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser, Document {}
}
