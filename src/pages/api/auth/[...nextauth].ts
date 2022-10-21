/* eslint-disable no-param-reassign */
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import mongoConnect from '@/utils/store/mongoConnect'

export default NextAuth({
  adapter: MongoDBAdapter(mongoConnect),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || '',
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
      async profile(profile, tokens) {
        const profilePicture = await fetch(
          `https://graph.microsoft.com/v1.0/me/photos/48x48/$value`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        )

        const { name } = profile
        const commaIdx = name.indexOf(',')
        const newName =
          commaIdx !== -1
            ? `${name.substring(commaIdx + 1)} ${name.substring(0, commaIdx)}`
            : name

        // Confirm that profile photo was returned
        if (profilePicture.ok) {
          const pictureBuffer = await profilePicture.arrayBuffer()
          const pictureBase64 = Buffer.from(pictureBuffer).toString('base64')
          return {
            id: profile.sub,
            name: newName,
            email: profile.email,
            image: `data:image/jpeg;base64, ${pictureBase64}`,
          }
        }
        return {
          id: profile.sub,
          name: newName,
          email: profile.email,
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      ;(<any>session).user.id = token.id
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
})
