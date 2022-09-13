import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useAuth = () => {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated')
      router.push({
        pathname: '/auth/signin',
        query: {
          redirect: router.asPath,
        },
      })
  }, [status])

  return { status, session }
}

export default useAuth
