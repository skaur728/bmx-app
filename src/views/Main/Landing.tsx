import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'

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

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        ...(ua.isDesktop && { overflow: 'hidden' }),
        marginRight: { xs: '37vw', sm: 0 },
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#ffe8c9',
          pt: { xs: 10, sm: 5, md: 3 },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6vw' }}>
          Come one, come all
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontFamily: 'SpringFair, sans-serif', fontSize: '7vw' }}
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
            width: { xs: '200vw', sm: '60vw' },
            minWidth: '300px',
          }}
        >
          <Image
            src={TentImg}
            layout="responsive"
            priority
            alt="landing background"
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -30%)',
            }}
          >
            <StyledButton onClick={() => {}}>
              <Typography variant="h3">Apply</Typography>
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
