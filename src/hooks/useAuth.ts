import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import useSWR from 'swr'

import type { AxiosError } from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const useAuth = () => {
  const { status, data: session } = useSession()
  const router = useRouter()

  const { data, error, isValidating } = useSWR<{ user: IUser }, AxiosError>(
    () => (session?.user?.id ? `/api/user/${session.user.id}` : null),
    fetcher,
    {
      revalidateOnMount: true,
    }
  )

  const user = useMemo(() => data?.user, [data])

  useEffect(() => {
    if (isValidating) return

    if (error) {
      console.error(error)
    }

    if (status === 'unauthenticated') {
      router.push({
        pathname: '/auth/signin',
        query: {
          redirect: router.asPath,
        },
      })
    }
  }, [status, error, isValidating])

  return { status: isValidating ? 'loading' : status, session, user, error }
}

export default useAuth
