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
        width: { xs: '180vw', sm: '100vw' },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '-33%', sm: '5%' },
          bottom: 0,
          width: { xs: '500px', sm: '40vw' },
          minWidth: 400,
        }}
      >
        <AboutSign />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: '0', sm: '5%' },
          bottom: -10,
          width: { xs: '120vw', sm: '50vw' },
          maxWidth: '700px',
          maxHeight: '90vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {ua.isDesktop ? <InfoTent /> : <InfoTentMobile />}
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              width: '85%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant={ua.isDesktop ? 'h5' : 'body2'}>
              BoilerMake is a hackathon that brings over 500 hackers from across
              the country under one roof for one incredible weekend. Since 2013,
              our team&apos;s mission has been to drive a culture of dedication
              to creativity, achievement, and innovation. We seek to empower
              every hacker with the tools to build anything that they can
              imagine, and we find happiness in knowing that hackers will walk
              out of our doors with memories that will last a lifetime.
            </Typography>
            <Typography variant={ua.isDesktop ? 'h5' : 'body2'}>
              This year, 37 undergraduate students from Purdue University have
              come together to host an unforgettable hackathon. All the work
              that has gone into planning this event - setting up the venue,
              organizing activities and catering, sending mass emails - was
              accomplished by somebody just like you.
            </Typography>
            <Typography variant={ua.isDesktop ? 'h5' : 'body2'}>
              If you love hackathons and are interested in getting involved,
              come talk to us at BoilerMake! We&apos;ll be looking for new
              people to help us throw another successful hackathon in 2024!
            </Typography>
            <Typography variant={ua.isDesktop ? 'h5' : 'body2'}>
              If you have any questions, feel free to hit us up at
              team@boilermake.org.
            </Typography>
            <Typography variant={ua.isDesktop ? 'h5' : 'body2'}>
              As always, hack on ♥
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
