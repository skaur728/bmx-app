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
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        const { name, login }: { name: string; login: string } = profile
        const [firstName, ...lastNameArr] = (name ?? login).split(' ')
        const lastName = lastNameArr.join(' ')

        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          firstName,
          lastName,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || '',
      async profile(profile) {
        const { name }: { name: string } = profile
        const [firstName, ...lastNameArr] = name.split(' ')
        const lastName = lastNameArr.join(' ')

        return {
          id: profile.sub,
          name: profile.name,
          firstName,
          lastName,
          email: profile.email,
          image: profile.picture,
        }
      },
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

        const { name }: { name: string } = profile
        const commaIdx = name.indexOf(',')
        const newName =
          commaIdx !== -1
            ? `${name.substring(commaIdx + 1)} ${name.substring(0, commaIdx)}`
            : name

        const [firstName, ...lastNameArr] = newName.split(' ')
        const lastName = lastNameArr.join(' ')

        // Confirm that profile photo was returned
        if (profilePicture.ok) {
          const pictureBuffer = await profilePicture.arrayBuffer()
          const pictureBase64 = Buffer.from(pictureBuffer).toString('base64')
          return {
            id: profile.sub,
            name: newName,
            firstName,
            lastName,
            email: profile.email,
            image: `data:image/jpeg;base64, ${pictureBase64}`,
          }
        }
        return {
          id: profile.sub,
          name: newName,
          firstName,
          lastName,
          email: profile.email,
        }
      },
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
