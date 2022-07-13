import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import AzureADProvider from 'next-auth/providers/azure-ad'
import mongoConnect from '@/utils/store/mongoConnect'
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { createUser, getUsers } from '@/controllers/user'
import to from 'await-to-js'
import { connectToDatabase } from '@/utils/connectDB'
import { signIn } from 'next-auth/react'


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
    }),
      CredentialsProvider({
          name: "Credentials",
          credentials: {
              email: { label: "Username (email)", type: "email"},
              password: { label: "Password", type: "password" }
          },

          async authorize(credentials, req) {
              const email = credentials.email;
              const password = credentials.password;
              try {
                  if (!email) {
                      throw new Error("Please enter a valid email address")
                  }
                  if (!password) {
                      throw new Error("Please enter a password")
                  }
              } catch (error) {
                  let message = 'Unknown Error'
                  if (error instanceof Error) message = error.message;
                  console.log(message);
              }
              const client = await connectToDatabase();
              const usersCollection = client.db().collection('users');
              const user = await usersCollection.findOne({
                  email: credentials.email,
              });
              if (!user) {
                  try {
                      throw new Error("You haven't registered yet")
                  } catch (error) {
                      let message = 'Unknown Error'
                      if (error instanceof Error) message = error.message;
                      console.log(message);
                  }
              }
              if (user) return signinUser({ password, user })
          }
      }),
    ],
    session: {
        strategy: 'jwt'
    }
})

const signinUser = async ({ password, user }) => {
    try {
        if (!user.password) {
            throw new Error("Please enter password")
        }
        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            throw new Error("Password Incorrect.");
        }
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message;
        console.log(message);
    }
    return user;
}