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
        <p>
          This page shows the current user&apos;s application status. If a user
          has an application that is in progress, it is visible here.
        </p>
      </Box>
    </Container>
  )
}

export default UserProfileDashboardPage
