import { Box, Button, Typography, styled } from '@mui/material'
import Image from 'next/image'

import type { NextPage } from 'next'

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

const Landing: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        textAlign: 'center',
        color: '#ffe8c9',
        pt: 2,
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
        Boilermake X
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '6vw' }}>
        Purdue University | January 20-22, 2023
      </Typography>
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
          width: '60vw',
          minWidth: '300px',
        }}
      >
        <Image
          src="/images/main/tent.png"
          layout="responsive"
          width={769}
          height={351}
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

export default Landing
