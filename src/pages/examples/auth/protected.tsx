import { Container, Typography } from '@mui/material'
import axios from 'axios'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

import useAuth from '@/hooks/useAuth'

/**
 * Simply import useAuth and call the function to use it.
 *
 * If the user visits this page and isn't logged in, it'll redirect to the sign in page.
 */

const ProtectedPage = () => {
  const { session, status, user } = useAuth()

  useEffect(() => {
    console.log({ session, status, user })
  }, [session, status, user])

  const onAppClick = async () => {
    await axios.post('/api/application', {
      application: { first_name: 'hi' },
    })
  }

  // NOTE!!! You should still check status and session to see if the user is logged in to conditionally render
  return (
    <Container>
      <Typography>status: {status}</Typography>
      {status === 'loading' ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {status === 'authenticated' && (
            <Typography>Protected page</Typography>
          )}

          {session && (
            <button type="button" onClick={() => signOut()}>
              Sign out
            </button>
          )}

          <button onClick={onAppClick} type="button">
            Add App
          </button>
        </>
      )}
    </Container>
  )
}

export default ProtectedPage
