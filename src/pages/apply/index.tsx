import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'

interface Props {}

const BMApplicationFormPage: NextPage<Props> = ({}) => (
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
        This page holds the boilermake specific application questions. This page
        will also be a form.
      </p>
    </Box>
  </Container>
)

export default BMApplicationFormPage
