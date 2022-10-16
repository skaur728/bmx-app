import { Avatar, Box, Container, Stack, Typography } from '@mui/material'
import to from 'await-to-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import useApplication from '@/hooks/useApplication'
import { Button, TextField } from '@/styles/custom'

import type { NextPage } from 'next'
import type { FormEvent } from 'react'

interface Props {}

const Application: NextPage<Props> = () => {
  const { user, applications, loading } = useApplication()
  const router = useRouter()

  const [loadingSubmission, setLoadingSubmission] = useState(false)

  const application = useMemo(
    () => (user?.applications || ({} as IUser))['2023'],
    [user]
  )

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) return

    // redirect if user has no application yet
    const shouldRedirect = !application
    const [err, res] = await to(
      axios.post<{ application: IApplication }>('/api/application', {
        application: {
          // todo fields
        },
      })
    )

    // go to dashboard after finishing application for first time
    if (!err && shouldRedirect) {
      router.push({ pathname: '/dashboard' })
      return
    }

    setTimeout(() => {
      setLoadingSubmission(false)
    }, 750)
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
              {user && !application ? 'Create ' : ''}Application
            </Typography>

            <form onSubmit={onFormSubmit}>
              <Stack spacing={2} mt={1.5}>
                <TextField
                  variant="standard"
                  label="temp"
                  required
                  autoComplete="off"
                />

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
                      if (!application)
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

export default Application
