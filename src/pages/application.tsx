/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import to from 'await-to-js'
import axios from 'axios'
import { useS3Upload } from 'next-s3-upload'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import ApplicationStatus from '@/components/ApplicationStatus'
import Dropzone from '@/components/Dropzone'
import TopNav from '@/components/TopNav'
import useApplication from '@/hooks/useApplication'
import { Button, TextField } from '@/styles/custom'

import type { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import type { FormEvent } from 'react'

interface Props {}

const Application: NextPage<Props> = () => {
  const { user, applications, loading } = useApplication()
  const { uploadToS3 } = useS3Upload()

  const router = useRouter()

  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeVersion, setResumeVersion] = useState(0)
  const [resumeUrl, setResumeUrl] = useState('')

  // field states
  const [whyBM, setWhyBM] = useState('')
  const [projectIdea, setProjectIdea] = useState('')
  const [codeConduct, setCodeConduct] = useState(false)
  const [termConditions, setTermConditions] = useState(false)
  const [optInEmail, setOptInEmail] = useState(false)

  const [missingResume, setMissingResume] = useState(false)
  const [codeConductMissing, setCodeConductMissing] = useState(false)
  const [termConditionsMissing, setTermConditionsMissing] = useState(false)

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

    setWhyBM(application.whyBM || '')
    setProjectIdea(application.projectIdea || '')
    setCodeConduct(application.codeConduct)
    setTermConditions(application.termConditions)
    setOptInEmail(application.optInEmail)
    setResumeVersion(application.resumeVersion || 0)
    setResumeUrl(application.resume || '')
  }, [application])

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) return
    if (isFirst && !resumeFile) {
      setMissingResume(true)
    }

    // trim the fields
    const _whyBM = whyBM.trim()
    const _projectIdea = projectIdea.trim()

    if (!codeConduct) setCodeConductMissing(true)
    if (!termConditions) setTermConditionsMissing(true)

    if (
      !_whyBM ||
      !_projectIdea ||
      !codeConduct ||
      !termConditions ||
      (isFirst && !resumeFile)
    )
      return

    setLoadingSubmission(true)

    // upload resume first, and get url
    const { url }: { url?: string } = resumeFile
      ? await uploadToS3(resumeFile, {
          endpoint: {
            request: {
              headers: {},
              body: {
                id: user._id,
                version: resumeVersion,
              },
            },
          },
        })
      : {}

    if (isFirst) {
      const [err, res] = await to(
        axios.post<
          { application: IApplication },
          AxiosResponse<{ application: IApplication }>,
          { application: Partial<IApplication> }
        >('/api/application', {
          application: {
            ...(url && {
              resume: url,
              resumeVersion: resumeVersion + 1,
            }),
            whyBM: _whyBM,
            projectIdea: _projectIdea,
            codeConduct,
            termConditions,
            optInEmail,
          },
        })
      )

      // go to dashboard after finishing application for first time
      if (!err) {
        router.push({ pathname: '/dashboard' })
      }

      return
    }

    const [err, res] = await to(
      axios.patch<
        { application: IApplication },
        AxiosResponse<{ application: IApplication }>,
        { payload: Partial<IApplication> }
      >(
        `/api/application/${
          (application as IApplication & { _id: string })._id
        }`,
        {
          payload: {
            ...(url && {
              resume: url,
              resumeVersion: resumeVersion + 1,
            }),
            whyBM: _whyBM,
            projectIdea: _projectIdea,
            codeConduct,
            termConditions,
            optInEmail,
          },
        }
      )
    )

    setResumeFile(null)
    if (url) {
      setResumeUrl(url)
      setResumeVersion((p) => p + 1)
    }

    setTimeout(() => {
      setLoadingSubmission(false)
    }, 750)
  }

  // TODO add in loading

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
                {isFirst ? 'Create ' : ''}Application
              </Typography>

              {!isFirst && application?.decision && (
                <ApplicationStatus decision={application.decision} />
              )}

              <form onSubmit={onFormSubmit} style={{ width: '100%' }}>
                <Stack
                  spacing={2}
                  mt={1.5}
                  sx={{ maxWidth: '800px', mx: 'auto' }}
                >
                  <FormControl>
                    <FormLabel sx={{ fontSize: '1.3rem' }}>
                      What do you hope to take away from BoilerMake? (e.g.
                      talking to companies, making friends, learning new things,
                      etc.)
                      <br />
                      <Typography
                        component="span"
                        sx={{ fontWeight: 600, fontSize: '1rem' }}
                      >
                        Max characters: {100 - whyBM.length}
                      </Typography>
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      value={whyBM}
                      onChange={(e) =>
                        e.target.value.length <= 100 && setWhyBM(e.target.value)
                      }
                      autoComplete="off"
                      multiline
                      rows={4}
                      sx={{
                        '& textarea': {
                          fontSize: '1.3rem',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel sx={{ fontSize: '1.3rem' }}>
                      Do you already have a project idea? If not, what
                      technologies are you interested in using at BoilerMake?
                      (e.g. web dev, app dev, Raspberry Pi, etc.)
                      <br />
                      <Typography
                        component="span"
                        sx={{ fontWeight: 600, fontSize: '1rem' }}
                      >
                        Max characters: {150 - projectIdea.length}
                      </Typography>
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      value={projectIdea}
                      onChange={(e) =>
                        e.target.value.length <= 150 &&
                        setProjectIdea(e.target.value)
                      }
                      autoComplete="off"
                      multiline
                      rows={4}
                      sx={{
                        '& textarea': {
                          fontSize: '1.3rem',
                        },
                      }}
                    />
                  </FormControl>

                  <Box mb={2}>
                    {application?.resume && (
                      <Box textAlign="center" mb={1}>
                        <Link variant="h5" href={resumeUrl} target="_blank">
                          Current resume
                        </Link>
                      </Box>
                    )}

                    <Dropzone
                      setFile={(file) => {
                        setMissingResume(false)
                        setResumeFile(file)
                      }}
                      file={resumeFile}
                      error={missingResume}
                    />
                  </Box>

                  <hr />

                  <FormGroup>
                    <FormControlLabel
                      sx={{ alignItems: 'flex-start' }}
                      control={
                        <Checkbox
                          checked={codeConduct}
                          onChange={(e) => {
                            setCodeConduct(e.target.checked)
                            setCodeConductMissing(false)
                          }}
                          sx={{
                            ...(codeConductMissing && { color: '#d81b60' }),
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ pt: '9px' }}>
                          <b>MLH Code of Conduct:</b> I have read and agree to
                          the{' '}
                          <Link
                            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                            target="_blank"
                          >
                            MLH Code of Conduct
                          </Link>
                          .
                        </Typography>
                      }
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={termConditions}
                          onChange={(e) => {
                            setTermConditions(e.target.checked)
                            if (e.target.checked)
                              setTermConditionsMissing(false)
                          }}
                          sx={{
                            ...(termConditionsMissing && {
                              color: '#d81b60',
                            }),
                          }}
                        />
                      }
                      sx={{ alignItems: 'flex-start' }}
                      label={
                        <Typography>
                          <b>Events Logistics Information:</b> I authorize you
                          to share my application/registration information with
                          Major League Hacking for event administration,
                          ranking, and MLH administration in-line with the{' '}
                          <Link href="https://mlh.io/privacy" target="_blank">
                            MLH Privacy Policy
                          </Link>
                          . I further agree to the terms of both the{' '}
                          <Link
                            href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                            target="_blank"
                          >
                            MLH Contest Terms and Conditions
                          </Link>{' '}
                          and the{' '}
                          <Link href="https://mlh.io/privacy" target="_blank">
                            MLH Privacy Policy
                          </Link>
                          .
                        </Typography>
                      }
                    />

                    <FormControlLabel
                      sx={{ alignItems: 'flex-start' }}
                      control={
                        <Checkbox
                          checked={optInEmail}
                          onChange={(e) => setOptInEmail(e.target.checked)}
                        />
                      }
                      label={
                        <Typography sx={{ pt: '9px' }}>
                          <b>(Optional) Communication from MLH:</b> I authorize
                          MLH to send me an email where I can further opt into
                          the MLH Hacker, Events, or Organizer Newsletters and
                          other communications from MLH.
                        </Typography>
                      }
                    />
                  </FormGroup>

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
    </>
  )
}

export default Application
