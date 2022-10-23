import { Box, Typography } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import InfoTentMobileImg from '../../../public/images/about/info-tent-mobile.svg'
import InfoTentImg from '../../../public/images/about/info-tent.svg'

import type { NextPageContext } from 'next'

const AboutSign = dynamic(() => import('@/components/About/AboutSign'))

const About = ({ uaString }: { uaString?: string }) => {
  const ua = useUserAgent(uaString || window.navigator.userAgent)

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      {/* {ua.isDesktop && ( */}
      <Box
        sx={{
          position: 'absolute',
          left: '5%',
          bottom: 0,
          width: '40vw',
          minWidth: 400,
        }}
      >
        <AboutSign />
      </Box>
      {/* )} */}
      <Box
        sx={{
          position: 'absolute',
          right: ua.isDesktop ? '5%' : '50%',
          bottom: 0,
          transform: ua.isDesktop ? 'none' : 'translateX(50%)',
          width: ua.isDesktop ? '50vw' : '90vw',
          maxWidth: '700px',
          maxHeight: '90vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* TODO conditionally render mobile image */}
          {/* <Image src={InfoTentImg} alt="Info Tent" layout="responsive" /> */}

          <Image src={InfoTentMobileImg} alt="Info Tent" layout="responsive" />
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
