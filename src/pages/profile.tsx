/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Container, Skeleton, Stack, Typography } from '@mui/material'
import to from 'await-to-js'
import axios from 'axios'
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

  const [name, setName] = useState('')

  useEffect(() => {
    if (!user) return
    setName(user.preferredName || user.name || '')
  }, [user])

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const _name = name.trim()
    if (!_name) return

    // save boolean since updating user will change isFirst
    const shouldRedirect = isFirst

    const [error, res] = await to(
      axios.patch(`/api/user/${user._id}`, {
        payload: { preferredName: _name, hasFilledProfile: true },
      })
    )

    // go to application after finishing profile for first time
    if (!error && shouldRedirect) router.push({ pathname: '/application' })
  }

  if (status === 'loading') {
    return (
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
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 10 } }}>
      {user && (
        <Stack alignItems="center">
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
              />
              <TextField
                variant="standard"
                label="Email"
                value={user.email}
                disabled
              />

              <Stack alignItems="center" pt={2}>
                <Button type="submit" sx={{ fontSize: '1.2rem' }}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      )}
    </Container>
  )
}

export default UserProfile
