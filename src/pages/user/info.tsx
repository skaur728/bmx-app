import { Box, Button, Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'

interface Props {}

const submitUserInfo = (router: Router, userObj: any | undefined) => {
  console.log(userObj)
  router.push('/apply')
}

const UserInfoFormPage: NextPage<Props> = ({}) => {
  const router = useRouter()

  return (
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

      <Button onClick={() => submitUserInfo(router, null)}>SUBMIT</Button>
    </Container>
  )
}

export default UserInfoFormPage
