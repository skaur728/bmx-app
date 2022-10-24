import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'

import useRedirect from '@/hooks/useRedirect'

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
          left: 15,
          top: 15,
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
      <Box
        sx={{
          textAlign: 'center',
          color: '#ffe8c9',
          pt: { xs: 15, sm: 5, md: 3 },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 1,
        }}
      >
        {ua.isDesktop ? (
          <>
            <Typography variant="h1" sx={{ fontSize: '6vw' }}>
              Come one, come all
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontFamily: 'SpringFair, sans-serif', fontSize: '7vw' }}
            >
              Boilermake X
            </Typography>
            <Typography variant="h2" sx={{ fontSize: '6vw' }}>
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
              Boilermake
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
            width: { xs: '450vw', sm: '130vw' },
            maxWidth: { xs: 2000, sm: 1800 },
            minWidth: 300,
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
            <StyledButton onClick={() => redirect('/dashboard')}>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: '2.8rem', sm: '4vw' } }}
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
