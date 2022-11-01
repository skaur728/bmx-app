import { Box, Typography } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import dynamic from 'next/dynamic'

import { AboutSign } from '@/components/About'

import type { NextPageContext } from 'next'

const InfoTent = dynamic(() => import('@/components/About/InfoTent'))
const InfoTentMobile = dynamic(
  () => import('@/components/About/InfoTentMobile')
)

const About = ({ uaString }: { uaString?: string }) => {
  const ua = useUserAgent(uaString || window.navigator.userAgent)

  return (
    <Box
      sx={{
        height: '100vh',
        width: { xs: '180vw', md: '130vw', lg: '100vw' },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '-33%', sm: 0 },
          bottom: 0,
          width: { xs: 500, lg: '35vw' },
        }}
      >
        <AboutSign />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 0, md: '10%' },
          bottom: -10,
          width: { xs: 450, sm: 700 },
          maxHeight: '98vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {!ua.isMobile ? <InfoTent /> : <InfoTentMobile />}
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
            <Typography variant={!ua.isMobile ? 'h6' : 'body1'}>
              BoilerMake is a hackathon that brings over 500 hackers from across
              the country under one roof for one incredible weekend. Since 2013,
              our team&apos;s mission has been to drive a culture of dedication
              to creativity, achievement, and innovation. We seek to empower
              every hacker with the tools to build anything that they can
              imagine, and we find happiness in knowing that hackers will walk
              out of our doors with memories that will last a lifetime.
            </Typography>
            <Typography variant={!ua.isMobile ? 'h6' : 'body1'} sx={{ mt: 2 }}>
              By participating in a hackathon, students are provided with a
              unique opportunity to network with other participants who share
              their enthusiasm for technology and are from different backgrounds
              and universities. BoilerMake facilitates the development of these
              relationships, thereby strengthening innovative culture across the
              Midwest, and positions Purdue as the coordinator of that
              development, which elevates the university&apos;s reputation as an
              institution that values innovation.
            </Typography>
            <Typography variant={!ua.isMobile ? 'h6' : 'body1'} sx={{ mt: 2 }}>
              If you have any questions, feel free to email us at{' '}
              <a href="mailto:team@boilermake.org" style={{ color: 'inherit' }}>
                team@boilermake.org
              </a>
              .
            </Typography>
            <Typography variant={!ua.isMobile ? 'h6' : 'body1'} sx={{ mt: 2 }}>
              As always, hack on ❤️
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default About

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
