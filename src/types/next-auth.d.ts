import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {}

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: ObjectId
  }
}
