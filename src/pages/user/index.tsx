import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import to from 'await-to-js'

import { getUsers } from '@/controllers/user'
import dbConnect from '@/utils/store/dbConnect'

import type { IUser } from '@/models/User'
import type { NextPage } from 'next'

interface Props {
  users: IUser[]
}

const UserPage: NextPage<Props> = ({ users }) => (
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
      <Typography variant="h6">Users</Typography>
      <Box>
        {users.map(({ firstName, lastName, _id }) => (
          <Typography variant="body1" key={_id}>
            {firstName} {lastName}
          </Typography>
        ))}
      </Box>
    </Box>
  </Container>
)

export async function getServerSideProps() {
  await dbConnect()
  const [, users] = await to(getUsers())
  return { props: { users } }
}

export default UserPage
