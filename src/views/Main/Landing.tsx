import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'

import useRedirect from '@/hooks/useRedirect'

import Arrow1 from '../../../public/images/main/arrows/arrow1.svg'
import Arrow2 from '../../../public/images/main/arrows/arrow2.svg'
import Arrow3 from '../../../public/images/main/arrows/arrow3.svg'
import MLHImg from '../../../public/images/main/mlh.svg'
import TentImg from '../../../public/images/main/tent.svg'

import type { NextPageContext } from 'next'

const StyledButton = styled(Button)({
  padding: '10px 40px',
  borderRadius: '50px',
  backgroundColor: '#893422',
  color: '#ffe8c9',
  boxShadow:
    'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
  transition: 'transform 0.25s ease',
  '&:hover': {
    backgroundColor: '#792d1e',
    transform: 'scale(1.04)',
  },
  '&:active': {
    transform: 'scale(1)',
  },
})

const Landing = ({ uaString }: { uaString?: string }) => {
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
      <Box
        sx={{
          position: 'absolute',
          left: 20,
          top: 26,
          width: 70,
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

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        spacing={2}
      >
        <Box sx={{ width: 200, transform: 'scaleX(-1)' }}>
          <Image src={Arrow1} alt="arrow" layout="responsive" />
        </Box>
        <Box>
          <Typography sx={{ color: '#ffe8c9', fontSize: '2rem' }}>
            Scroll
          </Typography>
        </Box>
        <Box sx={{ width: 200 }}>
          <Image src={Arrow1} alt="arrow" layout="responsive" />
        </Box>
      </Stack>

      <Box
        sx={{
          textAlign: 'center',
          color: '#ffe8c9',
          pt: { xs: 13, sm: 5, md: 3 },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 1,
        }}
      >
        {!ua.isMobile ? (
          <>
            <Typography
              variant="h1"
              sx={{ fontSize: { sm: '2.5rem', md: '3.5rem', lg: '4rem' } }}
            >
              Come one, come all
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'SpringFair, sans-serif',
                fontSize: { sm: '3rem', md: '4rem', lg: '5rem' },
              }}
            >
              BoilerMake X
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { sm: '2.3rem', md: '3.2rem', lg: '3.5rem' } }}
            >
              Purdue University | January 20-22, 2023
            </Typography>
          </>
        ) : (
          <Box sx={{ maxWidth: '375px', mx: 'auto' }}>
            <Typography variant="h1" sx={{ fontSize: '6vw', mb: 1 }}>
              Come one, come all
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontFamily: 'SpringFair, sans-serif', fontSize: '2.4rem' }}
            >
              BoilerMake
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography
                variant="h2"
                component="span"
                sx={{ fontSize: '1.5rem', width: '150px' }}
              >
                Purdue University
              </Typography>
              <Typography
                component="span"
                variant="h1"
                sx={{ fontFamily: 'SpringFair, sans-serif' }}
              >
                X
              </Typography>
              <Typography
                variant="h2"
                component="span"
                sx={{ fontSize: '1.5rem', width: '150px' }}
              >
                January 20-22, 2023
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 1600, sm: 2000, md: '130vw' },
            minWidth: { xs: 0, md: 2000 },
          }}
        >
          <Image
            src={TentImg}
            layout="responsive"
            priority
            alt="landing background"
            style={{ pointerEvents: 'none' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '71%',
              left: '50%',
              transform: 'translate(-50%, -30%)',
            }}
          >
            <StyledButton
              onClick={() => redirect('/dashboard')}
              sx={{ zIndex: 10 }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: '2.8rem', sm: '3rem', md: '4vw' } }}
              >
                Apply
              </Typography>
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Landing

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
