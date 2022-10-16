/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import to from 'await-to-js'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import useAuth from '@/hooks/useAuth'
import { Button, TextField } from '@/styles/custom'

import type { NextPage } from 'next'
import type { FormEvent } from 'react'

interface Props {}

const UserProfile: NextPage<Props> = () => {
  const { user, status } = useAuth()
  const router = useRouter()
  // boolean to check if they've filled profile out before
  const isFirst = useMemo(() => !user?.hasFilledProfile, [user])

  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [name, setName] = useState('')
  const [major, setMajor] = useState('')
  const [gender, setGender] = useState('')
  const [gradYear, setGradYear] = useState('')

  useEffect(() => {
    if (!user) return

    setName(user.preferredName || user.name || '')
    setMajor(user.major || '')
    setGender(user.gender || '')
    setGradYear(user.gradYear || '')
  }, [user])

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const _name = name.trim()
    const _major = major.trim()
    if (!_name || !_major) return

    // save boolean since updating user will change isFirst
    const shouldRedirect = isFirst

    setLoadingSubmission(true)
    const [error, res] = await to(
      axios.patch(`/api/user/${user._id}`, {
        payload: {
          preferredName: _name,
          hasFilledProfile: true,
          gradYear,
          major: _major,
        },
      })
    )

    // go to application after finishing profile for first time
    if (!error && shouldRedirect) {
      router.push({ pathname: '/application' })
      return
    }

    setTimeout(() => {
      setLoadingSubmission(false)
    }, 750)
  }

  if (status === 'loading') {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(#1c2634 60%,  #694028)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 10 } }}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h1">Profile</Typography>
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={220}
              height={40}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={170}
              height={60}
              animation="wave"
            />
          </Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(#1c2634 60%,  #694028)',
      }}
    >
      {/* <Box
        sx={{ position: 'absolute', width: '180px', bottom: -15, right: -45 }}
      >
        <Image
          src="/images/profile/bunny.svg"
          alt="bunny"
          width={75}
          height={150}
          layout="responsive"
        />
      </Box> */}

      <Box
        sx={{
          position: 'absolute',
          width: '30vw',
          minWidth: '300px',
          bottom: '-10%',
          right: 30,
        }}
      >
        <Image
          src="/images/profile/balloons.svg"
          alt="balloons"
          width={103}
          height={150}
          layout="responsive"
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          width: '80vw',
          maxWidth: '1200px',
          bottom: '-50%',
          left: '40%',
          transform: 'translateX(-50%)',
        }}
      >
        <Image
          src="/images/profile/ferris-wheel.svg"
          alt="ferris wheel"
          width={159}
          height={150}
          layout="responsive"
        />
      </Box>

      {user && (
        <Stack
          alignItems="center"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '900px',
            width: '80vw',
          }}
        >
          <Stack
            alignItems="center"
            sx={{
              backgroundColor: '#ffffff',
              py: 5,
              width: '100%',
              zIndex: 2,
            }}
          >
            <Typography variant="h1">
              {user && isFirst ? 'Create ' : ''}Profile
            </Typography>
            <Avatar
              alt={name || ''}
              src={user.image || ''}
              sx={{ width: 120, height: 120, fontSize: '3rem' }}
            >
              {/* get initials if image doesn't exist */}
              {user.image
                ? ''
                : `${name.split(' ')[0][0]} ${
                    name.split(' ')[name.split(' ').length - 1][0]
                  }`}
            </Avatar>
            <form onSubmit={onFormSubmit}>
              <Stack spacing={2} mt={1.5}>
                <TextField
                  variant="standard"
                  label="Preferred Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
                <TextField
                  variant="standard"
                  label="Email"
                  value={user.email}
                  disabled
                />
                {/* TODO prob have select for gender */}
                <TextField
                  variant="standard"
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  autoComplete="off"
                  required
                />
                <TextField
                  variant="standard"
                  label="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  autoComplete="off"
                  required
                />
                {/* TODO maybe have select for years */}
                <FormControl
                  fullWidth
                  required
                  variant="standard"
                  sx={{
                    '& .MuiInput-root': {
                      fontSize: '1.4rem',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.4rem',
                    },
                  }}
                >
                  <InputLabel sx={{ fontSize: '1.5rem' }}>
                    Graduation Year
                  </InputLabel>
                  <Select
                    value={gradYear}
                    label="Graduation Year"
                    onChange={(e) => setGradYear(e.target.value)}
                  >
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2026">2026</MenuItem>
                    <MenuItem value="2027">2027</MenuItem>
                    <MenuItem value="2028">2028</MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  variant="standard"
                  label="Graduation Year"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  autoComplete="off"
                /> */}

                <Stack alignItems="center" pt={2}>
                  <Button
                    type="submit"
                    sx={{
                      fontSize: '1.2rem',
                      ...(loadingSubmission && {
                        backgroundColor: '#157822',
                        pointerEvents: 'none',
                      }),
                    }}
                  >
                    {(() => {
                      if (isFirst)
                        return loadingSubmission ? 'Submitted!' : 'Submit'
                      return loadingSubmission ? 'Updated!' : 'Update'
                    })()}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Stack>
      )}
    </Box>
  )
}

export default UserProfile
