import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useApplication from '@/hooks/useApplication'

import type { NextPage } from 'next'

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = () => {
  // Redirect logic time
  const { user, error, applications, loading } = useApplication()
  const router = useRouter()

  useEffect(() => {
    if (loading || !user) return
    console.log(loading, user)

    if (error) {
      // TODO redirect to error page
      console.error(error)
      return
    }

    if (!user.hasFilledProfile) {
      router.push({ pathname: '/profile' })
    }

    if (!applications['2023']) {
      router.push({ pathname: '/application' })
    }
  }, [user, error, loading, applications])

  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">User dashboard page</Typography>
        <Stack
          sx={{
            width: '250px',
            height: '300px',
            border: '1px solid black',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Stack
            direction="row"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: '#e2e2e2',
              borderRadius: '40px',
              padding: '5px 10px',
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                width: 25,
                height: 25,
                backgroundColor: 'yellow',
                mr: 2,
              }}
            />
            Pending
          </Stack>
          <Box sx={{ flex: 1, backgroundColor: 'green' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              background: 'aliceblue',
              borderRadius: '50%',
              border: '2px solid brown',
              width: 50,
              height: 50,
            }}
          >
            circle
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ pt: '40px', textAlign: 'center' }}>Jan 21 - 23</Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default UserProfileDashboardPage
