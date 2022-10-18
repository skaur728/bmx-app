import { Box, Container, Typography } from '@mui/material'
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
        <Box
          sx={{ width: '300px', height: '300px', border: '1px solid black' }}
        >
          <Box
            sx={{ height: '50%', width: '100%', backgroundColor: 'green' }}
          />
          <Box>text</Box>
        </Box>
      </Box>
    </Container>
  )
}

export default UserProfileDashboardPage
