import { Box, Container, Typography } from '@mui/material'

import type { NextPage } from 'next'

interface Props {}

const UserProfile: NextPage<Props> = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">User Info form page</Typography>
      <p>
        This page has the user info form that should be filled out if the user
        is new. This will be a form. After submitting this form, the user info
        should be filled out for the current logged in user. The user should
        then be sent to the BM application page.
      </p>
    </Box>
  </Container>
)

export default UserProfile
