/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Box, Container, Stack, Typography } from '@mui/material'
import to from 'await-to-js'
import axios from 'axios'
import { useS3Upload } from 'next-s3-upload'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import useApplication from '@/hooks/useApplication'
import { Button, TextField } from '@/styles/custom'

import type { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import type { FormEvent } from 'react'

interface Props {}

const Application: NextPage<Props> = () => {
  const { user, applications, loading } = useApplication()
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  const router = useRouter()

  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  // field states
  const [whyBM, setWhyBM] = useState('')
  const [projectIdea, setProjectIdea] = useState('')
  const [codeConduct, setCodeConduct] = useState(false)

  const isFirst = useMemo(
    () => !(user?.applications || ({} as IUser))['2023'],
    [user]
  )

  const application = useMemo(
    () => (applications || ({} as Record<string, IApplication>))['2023'],
    [applications]
  )

  useEffect(() => {
    // redirect user if they come here before finishing profile
    if (user && !loading && !user.hasFilledProfile) {
      router.push({ pathname: '/profile' })
    }
  }, [user, loading])

  useEffect(() => {
    if (!application) return

    // set the states here
    setWhyBM(application.whyBM || '')
    setProjectIdea(application.projectIdea || '')
    setCodeConduct(application.codeConduct)
  }, [application])

  const handleFileChange = async (file: File) => {
    setResumeFile(file)
  }

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user || !resumeFile) return

    // trim the fields
    const _whyBM = whyBM.trim()
    const _projectIdea = projectIdea.trim()

    if (!_whyBM || !_projectIdea) return

    // upload resume first, and get url
    const { url } = await uploadToS3(resumeFile, {
      endpoint: {
        request: {
          headers: {},
          body: {
            id: user._id,
          },
        },
      },
    })

    if (isFirst) {
      const [err, res] = await to(
        axios.post<
          { application: IApplication },
          AxiosResponse<{ application: IApplication }>,
          { application: Partial<IApplication> }
        >('/api/application', {
          application: {
            resume: url,
            whyBM: _whyBM,
            projectIdea: _projectIdea,
            codeConduct,
          },
        })
      )

      // go to dashboard after finishing application for first time
      if (!err) {
        router.push({ pathname: '/dashboard' })
      }

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
              {isFirst ? 'Create ' : ''}Application
            </Typography>

            <form onSubmit={onFormSubmit}>
              <Stack spacing={2} mt={1.5}>
                {/* https://mui.com/material-ui/react-textarea-autosize/ */}
                <TextField
                  variant="standard"
                  label="WhyBM"
                  required
                  value={whyBM}
                  onChange={(e) => setWhyBM(e.target.value)}
                  autoComplete="off"
                  multiline
                  rows={4}
                />

                <TextField
                  variant="standard"
                  label="Proj Idea"
                  required
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  autoComplete="off"
                  multiline
                  rows={4}
                />

                <FileInput onChange={handleFileChange} />

                <Button onClick={openFileDialog}>Upload file</Button>

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

export default Application
