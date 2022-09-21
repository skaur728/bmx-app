import { IUser } from '@/models/User'
import axios from 'axios'
import useSWR from 'swr'
import useAuth from './useAuth'

/* Actually performs the request for SWR */
const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data)

export type UserState = { user?: IUser; error?: any }

/**
 * Get the user object for this current session.
 */
const useAuthUser = (): UserState => {
  const { status, session } = useAuth()

  const iffyEmail = session?.user?.email

  const { data, error } = useSWR(
    () => (iffyEmail ? `/api/user?email=${iffyEmail}` : null),
    fetcher
  )

  return { user: data, error }
}

export default useAuthUser
