import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import mongoConnect from '@/utils/store/mongoConnect'

export default NextAuth({
  adapter: MongoDBAdapter(mongoConnect),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || '',
    }),
  ],
})
