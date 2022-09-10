import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import { IUser } from '@/models/User'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const AuthExample = () => {
  const { data: session } = useSession()
  const { data, error } = useSWR(
    () => (session?.user ? `/api/user?email=${session.user.email}` : null),
    fetcher
  )
  const router = useRouter()

  useEffect(() => {
    console.log(session)
  }, [session])

  if (session) {
    if (error) {
      return <>Failed to load user object</>
    }

    if (!data) {
      return <>Loading...</>
    }

    const user: IUser = data.user

    if (/* Check if user info is filled out*/ false) {
      // User info is filled out

      if (/* Check if application is complete*/ true) {
        router.replace('/user/profile')
      } else {
        router.replace('/apply')
      }
    } else {
      router.replace('/user/info')
    }

    return (
      <>
        Welcome {user.name} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default AuthExample
