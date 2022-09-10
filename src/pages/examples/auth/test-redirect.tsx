import { Container, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'

import useRedirect from '@/hooks/useRedirect'

/**
 * This page and /protected uses two hooks for auth: useRedirect() and useAuth()
 *
 * useRedirect() returns redirect(redirectUrl: string) that can be used to redirect to a different page that requires user auth.
 * In this example, clicking the button "Go to protected" will redirect to /test/auth/protected IF the user is already logged in.
 * Otherwise, it'll redirect to the custom sign in page.
 */

const TestRedirect = () => {
  const { redirect } = useRedirect()
  const { data: session } = useSession()

  const onClick = () => {
    redirect('/test/auth/protected')
  }

  return (
    <Container>
      <Typography>is signed in? {session ? 'true' : 'false'}</Typography>

      {session && (
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      )}

      <button type="button" onClick={onClick}>
        Go to protected
      </button>
    </Container>
  )
}

export default TestRedirect
