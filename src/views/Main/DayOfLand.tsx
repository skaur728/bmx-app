import { ThemeProvider } from '@emotion/react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CssBaseline,
  Link,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useUserAgent } from 'next-useragent'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Countdown from 'react-countdown'

import useRedirect from '@/hooks/useRedirect'

import TentImg from '../../../public/images/about/info-tent.svg'
import SlackImg from '../../../public/images/dayOf/slack_asset.svg'
import Arrow from '../../../public/images/dayOf/time_left.svg'
import MLHImg from '../../../public/images/main/mlh-trust-badge-2023-white.svg'
import TicketBoothImg from '../../../public/images/testimonials/ticket-booth.png'

import type { NextPageContext } from 'next'

const Booth = dynamic(() => import('@/components/DayOf/Booth'))

const carnivalTheme = createTheme({
  typography: {
    fontFamily: '"Carnival", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Carnival',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: 'url("/assets/fonts/CarnivalRimmed.ttf")',
        },
      },
    },
  },
})

const InfoTent = dynamic(() => import('@/components/About/InfoTent'))

const DayOfLand = ({ uaString }: { uaString?: string }) => {
  const ua = useUserAgent(uaString || window.navigator.userAgent)

  const { redirect } = useRedirect()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        marginRight: { xs: '80vw', sm: 0 },
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          position: 'absolute',
          left: 20,
          top: 26,
        }}
      >
        <Box
          sx={{
            width: { xs: 35, sm: 45 },
            transition: 'transform 250ms ease',
            '&:hover': {
              transform: 'scale(1.04)',
            },
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={() => window.open('https://mlh.io/', '_blank')}
        >
          <Image src={MLHImg} layout="responsive" alt="mlh" />
        </Box>
        <Link
          href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
          target="_blank"
          sx={{
            textDecoration: 'none',
            color: '#ffffff',
            zIndex: 10,
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            fontFamily: 'Smythe',
          }}
        >
          Code of Conduct
        </Link>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          right: { xs: 0, md: '60%' },
          bottom: 0,
          width: { xs: 450, sm: 500 },
          maxHeight: '90vh',
        }}
          >
              <Box
                  sx={{
                      position: 'absolute',
                      width: { sm: 270, md: '25vw', lg: '27vw' },
                      left: { md: '27%', lg: '29%' },
                      mt: { sm: 25, md: 30, lg: 29 },
                      zIndex: 2,
                  }}
              >
                  <Countdown
                      date="2023-01-22T11:00:00.000Z"
                      daysInHours
                      renderer={(props) => (
                          <Typography
                              sx={{
                                  color: '#551600',
                                  textAlign: 'center',
                                  fontSize: { sm: 60, md: 60, lg: 60 },
                              }}
                          >
                              {props.formatted.hours}&nbsp; :&nbsp; {props.formatted.minutes}{' '}
                              &nbsp;: &nbsp;{props.formatted.seconds}
                          </Typography>
                      )}
                  />
              </Box>
        <Box
          sx={{
            position: 'relative',
            width: { sm: 650, md: '60vw', lg: '40vw' },
            top: 90,
            left: '10%',
          }}
        >
          <Image
            src={Arrow}
            layout="responsive"
            priority
            alt="Countdown"
            style={{ pointerEvents: 'none' }}
                  />
                  
              </Box>

          </Box>
          

        
        <Box
          sx={{
            position: 'relative',
            width: { sm: 225, md: '20vw', lg: '20vw' },
            bottom: 0,
            left: { md: '29%', lg: '200%' },
          }}
        >
          <Booth />
        </Box>
        <ThemeProvider theme={carnivalTheme}>
          <CssBaseline />
          <Box
            sx={{
              position: 'relative',
              width: { sm: 100, md: 250 },
              mt: { sm: 76, md: 77, lg: 104 },
              ml: { sm: 35, md: 42, lg: 58 },
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
            }}
            onClick={() =>
              window.open(
                'https://boilermake-x.devpost.com/?preview_token=TITPUBb%2BENHb4S6TUt2SdYVI9P5Jz7zv7%2FqlPn7G0Rs%3D',
                '_blank'
              )
            }
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Carnival, sans-serif',
                fontSize: { sm: '2rem', md: '2rem', lg: '3rem' },
                color: '#551600',
              }}
            >
              SUBMIT PROJECT
            </Typography>
          </Box>
        </ThemeProvider>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 0, md: '10%' },
          bottom: -10,
          width: { xs: 450, sm: 500 },
          maxHeight: '80vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <InfoTent />
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '25%', sm: '31%' },
              width: '87%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Carnival, sans-serif',
                fontSize: { sm: 18, md: 20, lg: 25 },
                color: '#FFE7CA',
              }}
            >
              LIVE ANNOUNCEMENTS:
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 150, sm: 170, md: 200 },
          mt: 5,
          ml: 145,
          zIndex: 10,
          cursor: 'pointer',
          transition: 'transform 250ms ease',
          '&:hover': {
            transform: 'scale(1.04)',
          },
        }}
      >
        <Image
          src={SlackImg}
          layout="responsive"
          alt="Slack"
          onClick={() => window.open('https://boilermakex.slack.com')}
        />
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          color: '#ffe8c9',
          pt: { xs: 20, sm: 12, md: 10 },
          position: 'absolute',
          ml: { xs: 40, sm: 50, md: 50 },
          width: { xs: 625, sm: 650, md: 700 },
          zIndex: 1,
        }}
      >
        {!ua.isMobile ? (
          <>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'SpringFair, sans-serif',
                fontSize: { sm: '3rem', md: '4rem', lg: '5rem' },
              }}
            >
              BoilerMake
            </Typography>
            <br />
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'SpringFair, sans-serif',
                fontSize: { sm: '5rem', md: '6rem', lg: '7rem' },
              }}
            >
              X
            </Typography>
          </>
        ) : (
          <Box sx={{ maxWidth: '375px', mx: 'auto' }}>
            <Typography
              variant="h1"
              sx={{ fontFamily: 'SpringFair, sans-serif', fontSize: '2.4rem' }}
            >
              BoilerMake X
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DayOfLand

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
