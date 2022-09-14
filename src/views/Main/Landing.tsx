import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import type { NextPage } from 'next'

const Landing: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      // background: 'linear-gradient(#1c2a3e 60%,  #ebdcbe)',
      backgroundImage: 'url(/images/main/gradient.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
        src="/images/main/tent.svg"
        layout="responsive"
        width={300}
        height={137}
        priority
        alt="landing background"
      />
    </Box>

    <Box sx={{ textAlign: 'center', color: '#ffe8c9', pt: 2 }}>
      <Typography variant="h1">Come one, come all</Typography>
      <Typography variant="h1" sx={{ fontFamily: 'Copperplate, sans-serif' }}>
        Boilermake IX
      </Typography>
      <Typography variant="h2">
        Purdue University | January{' '}
        <span style={{ fontFamily: 'PlayFair' }}>20-22, 2023</span>
      </Typography>
    </Box>
  </Box>
)

export default Landing
