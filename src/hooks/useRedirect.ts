import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useRedirect = () => {
  const { status } = useSession()
  const router = useRouter()

  const redirect = useCallback(
    (redirectUrl: string) => {
      if (status === 'unauthenticated')
        router.push({
          pathname: '/auth/signin',
          query: {
            redirect: redirectUrl,
          },
        })
      else if (status === 'authenticated') router.push(redirectUrl)
    },
    [status]
  )

  return { redirect }
}

export default useRedirect
