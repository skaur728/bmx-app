import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import to from 'await-to-js'
import type { IUser } from '@/models/User'
import dbConnect from '@/utils/store/dbConnect'
import { getUsers } from '@/controllers/user'

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
        {users.map(({ name, email, _id }) => (
          <Typography variant="body1" key={_id}>
            {name}: {email}
          </Typography>
        ))}
      </Box>
    </Box>
  </Container>
)

export async function getServerSideProps() {
  await dbConnect()
  const [, users] = await to(getUsers())
  console.log(`Got ${users?.length} users: ${JSON.stringify(users)}`)
  return { props: { users } }
}

export default UserPage
