import { Box, Container, Typography } from '@mui/material'
import { NextPage } from 'next'

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = ({}) => (
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
        This page shows the current user's application status. If a user has an
        application that is in progress, it is visible here.
      </p>
    </Box>
  </Container>
)

export default UserProfileDashboardPage
