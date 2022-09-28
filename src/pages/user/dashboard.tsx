import useAuthUser from '@/hooks/useAuthUser'
import { Box, Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const checkProfileInfo = () => {
  const { user, error } = useAuthUser()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      // TODO redirect to error page
      console.error(error)
    }
  
    if (!user) {
      console.error('No user for this account exists')
    }
  
    const hasProfileInfo = user?.profile_info ?? false
    if (!hasProfileInfo) {
      router.push({ pathname: '/user/info' })
    }
  }, [user])

  return user;
}

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = ({}) => {
  // Redirect logic time
  const authUser = checkProfileInfo()

  // If the profile info is not set, then go to /user/info
  // If user has not applied, then redirect to application page
  // TODO don't really have a check for this quite yet

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
          This page shows the current user's application status. If a user has
          an application that is in progress, it is visible here.
        </p>
      </Box>
    </Container>
  )
}

export default UserProfileDashboardPage
