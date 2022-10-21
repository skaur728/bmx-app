import { Box, Container, Stack, Typography } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

import Head from '@/components/Head'
import TopNav from '@/components/TopNav'
import useApplication from '@/hooks/useApplication'
import Background from '@/views/Main/Background'

import Balloons1 from '../../public/images/dashboard/balloons-1.svg'
import Balloons2 from '../../public/images/dashboard/balloons-2.svg'
import BottomBorderImg from '../../public/images/dashboard/bottom-border.svg'
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
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '50vw',
            opacity: 0.5,
            minWidth: 550,
          }}
        >
          <Image src={FerrisWheel} alt="ferris wheel" layout="responsive" />
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '50vw',
          maxWidth: 500,
          minWidth: 200,
        }}
      >
        <Image src={Balloons2} alt="balloons" layout="responsive" />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50vw',
          maxWidth: 500,
          minWidth: 300,
        }}
      >
        <Image src={Balloons1} alt="balloons" layout="responsive" />
      </Box>

      <Container>
        <Box
          sx={{
            my: 4,
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
              date={new Date(2023, 0, 21)}
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
            }}
          >
            <Stack
              direction="row"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: '#e2e2e2',
                borderRadius: '40px',
                padding: '5px 10px',
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  width: 25,
                  height: 25,
                  backgroundColor: 'yellow',
                  mr: 2,
                }}
              />
              Pending
            </Stack>
            <Box sx={{ flex: 1, backgroundColor: 'green' }} />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                background: 'aliceblue',
                borderRadius: '50%',
                border: '2px solid brown',
                width: 50,
                height: 50,
              }}
            >
              circle
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ pt: '40px', textAlign: 'center' }}>Jan 21 - 23</Box>
            </Box>
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
