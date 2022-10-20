import { Box } from '@mui/material'

import type { NextPage } from 'next'

const Background: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
    }}
  >
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(#1c2634 60%,  #694028)',
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
    </Box>
  </Box>
)

export default Background
