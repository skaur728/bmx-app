import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import useSWR from 'swr'

import type { AxiosError } from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const useAuth = (protectPage: boolean = true) => {
  const { status, data: session } = useSession()
  const router = useRouter()

  const { data, error, isValidating } = useSWR<{ user: IUser }, AxiosError>(
    () => (session?.user ? `/api/user` : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const user = useMemo(() => data?.user, [data])

  useEffect(() => {
    if (isValidating || !protectPage) return

    if (status === 'unauthenticated') {
      router.push({
        pathname: '/auth/signin',
        query: {
          redirect: router.asPath,
        },
      })
    }
  }, [status, isValidating, protectPage])

  return { status: isValidating ? 'loading' : status, session, user, error }
}

export default useAuth
