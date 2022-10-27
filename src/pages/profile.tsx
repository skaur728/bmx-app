/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Box,
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
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input'

import GenderSelect from '@/components/GenderSelect'
import Head from '@/components/Head'
import MajorSelect from '@/components/MajorSelect'
import SchoolSelect from '@/components/SchoolSelect'
import TopNav from '@/components/TopNav'
import useAuth from '@/hooks/useAuth'
import { Button, TextField } from '@/styles/custom'
import Background from '@/views/Main/Background'

import BorderImg from '../../public/images/cards/border.svg'
import FerrisWheel from '../../public/images/dashboard/ferris-wheel-cropped.svg'
import BalloonsImg from '../../public/images/profile/balloons.svg'

import type { NextPage, NextPageContext } from 'next'
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

const UserProfile: NextPage<Props> = ({ uaString }: { uaString?: string }) => {
  const { user } = useAuth()
  const router = useRouter()

  // boolean to check if they've filled profile out before
  const isFirst = useMemo(() => !user?.hasFilledProfile, [user])

  const ua = useUserAgent(uaString || window.navigator.userAgent)

  const [showChild, setShowChild] = useState(false)

  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [name, setName] = useState('')
  const [majors, setMajors] = useState<string[]>([])
  const [gender, setGender] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [school, setSchool] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>()
  const [phoneError, setPhoneError] = useState(false)
  const [age, setAge] = useState('')
  // check if user modified something in the page
  const [didModify, setDidModify] = useState(false)

  useEffect(() => {
    if (!didModify) return

    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.returnValue = 'unsaved'
    }

    window.addEventListener('beforeunload', beforeUnload)

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [didModify])

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
    const shouldRedirectToApp = isFirst

    setLoadingSubmission(true)
    const [error, res] = await to(
      axios.patch(`/api/user`, {
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
    if (shouldRedirectToApp) router.push({ pathname: '/application' })
    // otherwise go to dashboard
    else router.push({ pathname: '/dashboard' })
  }

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <>
      <Head title="Profile | BoilerMake X" />
      {user && <TopNav />}
      <Background />

      <Box
        sx={{
          pt: { xs: 10, sm: 10 },
          pb: { xs: 5, sm: 10 },
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
          }}
        >
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
              src={BalloonsImg}
              alt="balloons"
              layout="responsive"
              style={{ pointerEvents: 'none' }}
            />
          </Box>

          {ua.isDesktop && (
            <Box
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '50vw',
                opacity: 0.5,
                minWidth: 550,
              }}
            >
              <Image
                src={FerrisWheel}
                alt="ferris wheel"
                layout="responsive"
                style={{ pointerEvents: 'none' }}
              />
            </Box>
          )}
        </Box>

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
              backgroundColor: '#ffe8c9',
              py: { xs: 3, sm: 5 },
              px: { xs: 3, sm: 5 },
              width: '100%',
              zIndex: 2,
              borderRadius: '36px',
            }}
          >
            {user ? (
              <>
                <Box
                  sx={{
                    width: { xs: '100%', sm: '80%' },
                  }}
                >
                  <Image src={BorderImg} layout="responsive" alt="top border" />
                </Box>

                <Typography variant="h1">
                  {user && isFirst ? 'Create ' : ''}Profile
                </Typography>
                <Avatar
                  alt={name || ''}
                  src={user.image || ''}
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: '3rem',
                    border: '2px solid #b2b2b2',
                  }}
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
                      onChange={(e) => {
                        setName(e.target.value)
                        setDidModify(true)
                      }}
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
                        setDidModify(true)
                      }}
                      inputComponent={PhoneField as any}
                      error={phoneError}
                      helperText={phoneError ? 'Invalid phone number' : ''}
                    />

                    <GenderSelect
                      value={gender}
                      setValue={(e) => {
                        setGender(e)
                        setDidModify(true)
                      }}
                    />

                    <SchoolSelect
                      value={school}
                      setValue={(e) => {
                        setSchool(e)
                        setDidModify(true)
                      }}
                    />

                    <MajorSelect
                      value={majors}
                      setValue={(e) => {
                        setMajors(e)
                        setDidModify(true)
                      }}
                    />

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
                          onChange={(e) => {
                            setGradYear(e.target.value)
                            setDidModify(true)
                          }}
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
                          onChange={(e) => {
                            setAge(e.target.value)
                            setDidModify(true)
                          }}
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

                <Box
                  sx={{
                    width: { xs: '100%', sm: '80%' },
                    transform: 'rotate(180deg)',
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <Image src={BorderImg} layout="responsive" alt="top border" />
                </Box>
              </>
            ) : (
              <Stack alignItems="center" spacing={2} sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: { xs: '100%', sm: '80%' },
                  }}
                >
                  <Image src={BorderImg} layout="responsive" alt="top border" />
                </Box>

                <Typography variant="h1" sx={{ mb: 2 }}>
                  Profile
                </Typography>
                <Skeleton
                  variant="circular"
                  width={120}
                  height={120}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="60%"
                  sx={{ minWidth: '300px' }}
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="50%"
                  sx={{ minWidth: '250px' }}
                  height={60}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="30%"
                  sx={{ minWidth: '200px' }}
                  height={100}
                  animation="wave"
                />
                <Box
                  sx={{
                    width: { xs: '100%', sm: '80%' },
                    transform: 'rotate(180deg)',
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <Image src={BorderImg} layout="responsive" alt="top border" />
                </Box>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default UserProfile

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
