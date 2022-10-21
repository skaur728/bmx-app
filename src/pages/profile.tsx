/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Box,
  Container,
  FormControl,
  FormHelperText,
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
import { forwardRef, useEffect, useMemo, useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input'

import GenderSelect from '@/components/GenderSelect'
import MajorSelect from '@/components/MajorSelect'
import SchoolSelect from '@/components/SchoolSelect'
import TopNav from '@/components/TopNav'
import useAuth from '@/hooks/useAuth'
import { Button, TextField } from '@/styles/custom'

import type { NextPage } from 'next'
import type { FormEvent } from 'react'

interface Props {}

// eslint-disable-next-line react/display-name
const PhoneField = forwardRef((props, ref) => (
  <TextField
    variant="standard"
    label="Phone Number"
    required
    inputRef={ref}
    {...props}
  />
))

const UserProfile: NextPage<Props> = () => {
  const { user, status } = useAuth()
  const router = useRouter()
  // boolean to check if they've filled profile out before
  const isFirst = useMemo(() => !user?.hasFilledProfile, [user])

  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [name, setName] = useState('')
  const [majors, setMajors] = useState<string[]>([])
  const [gender, setGender] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [school, setSchool] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>()
  const [phoneError, setPhoneError] = useState(false)
  const [age, setAge] = useState('')

  useEffect(() => {
    if (!user) return

    setName(user.preferredName || user.name || '')
    setMajors(user.majors || [])
    setGender(user.gender || 'male')
    setGradYear(user.gradYear || '')
    setSchool(user.school || null)
    setPhone(user.phone || '')
    setAge(String(user.age || ''))
  }, [user])

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const _name = name.trim()
    const _gender = gender.trim()
    if (!_name || !majors?.length || !_gender || !school || !phone || !age)
      return

    if (!isValidPhoneNumber(phone)) {
      setPhoneError(true)
      return
    }

    // save boolean since updating user will change isFirst
    const shouldRedirect = isFirst

    setLoadingSubmission(true)
    const [error, res] = await to(
      axios.patch(`/api/user/${user._id}`, {
        payload: {
          preferredName: _name,
          hasFilledProfile: true,
          gradYear,
          majors,
          gender: _gender,
          school,
          phone,
          age,
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

  // TODO style loading
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
    <>
      <TopNav />
      <Box
        sx={{
          py: { xs: 5, sm: 10 },
          px: { xs: 3, sm: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
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
        </Box>
        {user && (
          <Stack
            alignItems="center"
            sx={{
              maxWidth: '900px',
              width: '100%',
              mx: 'auto',
            }}
          >
            <Stack
              alignItems="center"
              sx={{
                backgroundColor: '#ffe8c9eb',
                py: { xs: 2, sm: 5 },
                px: { xs: 3, sm: 5 },
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
                {user.image || !name
                  ? ''
                  : `${name.trim().split(' ')[0][0]} ${
                      name.trim().split(' ')[
                        name.trim().split(' ').length - 1
                      ][0]
                    }`}
              </Avatar>
              <form onSubmit={onFormSubmit} style={{ width: '100%' }}>
                <Stack
                  spacing={2}
                  mt={1.5}
                  sx={{ maxWidth: '500px', mx: 'auto' }}
                >
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
                  <PhoneInput
                    defaultCountry="US"
                    value={phone as any}
                    onChange={(num) => {
                      setPhone(num)
                      setPhoneError(false)
                    }}
                    inputComponent={PhoneField as any}
                    error={phoneError}
                    helperText={phoneError ? 'Invalid phone number' : ''}
                  />

                  <GenderSelect value={gender} setValue={setGender} />

                  <SchoolSelect value={school} setValue={setSchool} />

                  <MajorSelect value={majors} setValue={setMajors} />

                  <Stack direction="row" spacing={2} pt={2}>
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
                        flex: 1,
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
                        flex: 1,
                      }}
                    >
                      <InputLabel sx={{ fontSize: '1.5rem' }}>Age</InputLabel>
                      <Select
                        value={age}
                        label="Age"
                        onChange={(e) => setAge(e.target.value)}
                      >
                        {Object.keys([...new Array(31)]).map(
                          (i) =>
                            parseInt(i, 10) >= 18 && (
                              <MenuItem key={i} value={i}>
                                {i}
                              </MenuItem>
                            )
                        )}
                      </Select>
                      <FormHelperText sx={{ fontSize: '1rem' }}>
                        Participants must be 18+
                      </FormHelperText>
                    </FormControl>
                  </Stack>

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
                      // disabled={
                      //   !gender.trim() ||
                      //   !school ||
                      //   !majors?.length ||
                      //   !phone ||
                      //   !name.trim() ||
                      //   !gradYear ||
                      //   !age
                      // }
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
    </>
  )
}

export default UserProfile
