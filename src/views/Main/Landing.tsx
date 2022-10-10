import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import type { NextPage } from 'next'

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
        background: 'linear-gradient(#1c2a3e 60%,  #ebdcbe)',
        // backgroundImage: 'url(/images/main/gradient.svg)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundImage: 'url(/images/main/stars.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          height: '60vh',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%)',
        }}
      />
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
      </Box>
    </Box>
  </Box>
)

export default Landing
