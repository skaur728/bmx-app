import useAuthUser from '@/hooks/useAuthUser'
import { Box, Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = ({}) => {
  // Redirect logic time
  const { user, error } = useAuthUser()
  const router = useRouter()

  if (error) {
    // TODO handle this more gracefully...
    console.error(error)
  }

  if (!user) {
    console.error('No user for this account exists!!')
  }

  // If the profile info is not set, then go to /user/info
  const hasProfileInfo = user?.profile_info ?? false
  if (!hasProfileInfo) {
    router.push('/user/info')
  }

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
