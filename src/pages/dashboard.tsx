import { Box, Container, Link, Stack, Typography } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Countdown from 'react-countdown'

import ApplicationStatus from '@/components/ApplicationStatus'
import Head from '@/components/Head'
import TopNav from '@/components/TopNav'
import useApplication from '@/hooks/useApplication'
import Background from '@/views/Main/Background'

import Logo from '../../public/images/bmx-logo.png'
import Balloons1 from '../../public/images/dashboard/balloons-1.svg'
import Balloons2 from '../../public/images/dashboard/balloons-2.svg'
import BottomBorderImg from '../../public/images/dashboard/bottom-border.svg'
import CardImg from '../../public/images/dashboard/card-bg.svg'
import FerrisWheel from '../../public/images/dashboard/ferris-wheel-cropped.svg'
import TopBorderImg from '../../public/images/dashboard/top-border.svg'

import type { NextPage, NextPageContext } from 'next'

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = ({
  uaString,
}: {
  uaString?: string
}) => {
  const ua = useUserAgent(uaString || window.navigator.userAgent)

  const { user, error, applications, loading } = useApplication()
  const [showChild, setShowChild] = useState(false)

  const router = useRouter()

  const application = useMemo(
    () => (applications || ({} as Record<string, IApplication>))['2023'],
    [applications]
  )

  useEffect(() => {
    if (loading || !user) return

    if (!user.hasFilledProfile) {
      router.push({ pathname: '/profile' })
      return
    }

    if (!applications['2023']) {
      router.push({ pathname: '/application' })
    }
  }, [user, loading, applications])

  const formatDate = (date: Date) =>
    date.toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <>
      <Head title="Dashboard | BoilerMake X" />
      <Background />
      <TopNav />

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

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '50vw',
          maxWidth: 500,
          minWidth: 200,
        }}
      >
        <Image
          src={Balloons2}
          alt="balloons"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '50vw',
          maxWidth: 500,
          minWidth: 300,
        }}
      >
        <Image
          src={Balloons1}
          alt="balloons"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
      </Box>

      <Container>
        <Box
          sx={{
            mb: 4,
            mt: { xs: 10, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Image src={TopBorderImg} layout="responsive" alt="top border" />
            <Typography
              variant="h2"
              sx={{ color: '#ffe8c9', textAlign: 'center' }}
            >
              COUNTDOWN TO BOILERMAKE X
            </Typography>

            <Countdown
              date={new Date(2023, 0, 20)}
              renderer={(props) => (
                <Typography
                  variant="h1"
                  sx={{ color: '#ffe8c9', textAlign: 'center' }}
                >
                  {props.formatted.days}d : {props.formatted.hours}h :{' '}
                  {props.formatted.minutes}m : {props.formatted.seconds}s
                </Typography>
              )}
            />
            <Image
              src={BottomBorderImg}
              layout="responsive"
              alt="bottom border"
            />
          </Box>

          <Stack alignItems="center">
            <Box mt={9} mb={2}>
              <Typography
                variant="h3"
                sx={{ color: '#ffe8c9', textAlign: 'center' }}
              >
                Current Application
              </Typography>
              <Image src={TopBorderImg} layout="responsive" alt="top border" />
            </Box>

            <Stack
              sx={{
                width: '250px',
                height: '300px',
                border: '1px solid black',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow:
                  '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',

                transition: 'transform 200ms ease, box-shadow 200ms ease',
                '&:hover, &:active': {
                  boxShadow: 'none',
                  transform: 'translateY(3px)',
                },
              }}
              title="View application"
              onClick={() => router.push('/application')}
            >
              <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 3 }}>
                <ApplicationStatus
                  decision={application?.decision}
                  rsvp={application?.rsvp}
                />
              </Box>

              <Box sx={{ height: 150, overflow: 'hidden' }}>
                <Image
                  src={CardImg}
                  alt="card background"
                  layout="responsive"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                }}
              >
                <Image
                  src={Logo}
                  alt="Boilermake logo"
                  width="50"
                  height="50"
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#ffe7ca',
                }}
              >
                <Typography
                  sx={{
                    pt: 4,
                    textAlign: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  Jan 20 - 22
                  <span style={{ fontSize: '0.7em', display: 'block' }}>
                    In-person only
                  </span>
                  <Link
                    href="https://goo.gl/maps/Uvq4rF1ffdQv8Eh68"
                    target="_blank"
                    sx={{ fontSize: '0.7em', display: 'block' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    France A. Córdova Recreational Sports Center
                  </Link>
                </Typography>

                {application?.updatedAt && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 10,
                      bottom: 5,
                      fontSize: '0.8rem',
                    }}
                  >
                    <b>Last updated</b>:{' '}
                    {formatDate(new Date(application.updatedAt))}
                  </Box>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default UserProfileDashboardPage

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
