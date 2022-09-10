import { Container, Typography, Box, Button } from '@mui/material'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'

interface Props {}

const submitApplication = (router: Router, application: any | undefined) => {
  console.log(application)
  router.push('/user/profile')
}

const BMApplicationFormPage: NextPage<Props> = ({}) => {
  const router = useRouter()

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
        <Typography variant="h6">BoilerMake Application page</Typography>
        <p>
          This page holds the boilermake specific application questions. This
          page will also be a form. DELETE THIS WHEN STUFF ACTUALLY GOES IN
        </p>
      </Box>
      <Button onClick={() => submitApplication(router, null)}>SUBMIT</Button>
    </Container>
  )
}

export default BMApplicationFormPage
