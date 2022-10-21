import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

import TopNav from '@/components/TopNav'
import useApplication from '@/hooks/useApplication'
import Background from '@/views/Main/Background'

import BottomBorderImg from '../../public/images/dashboard/bottom-border.svg'
import TopBorderImg from '../../public/images/dashboard/top-border.svg'

import type { NextPage } from 'next'

interface Props {}

const UserProfileDashboardPage: NextPage<Props> = () => {
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
    // You can show some kind of placeholder UI here
    return null
  }

  // TODO add in loading

  return (
    <>
      <Background />
      <TopNav />
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
