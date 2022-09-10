import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import type { NextPage } from 'next'

const Landing: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      backgroundImage: 'url(/images/main/gradient.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Box
      sx={{
        backgroundImage: 'url(/images/main/stars.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'fill',
        backgroundPosition: 'center',
        height: '50vh',
      }}
    />
    {/* <Image
      src="/images/main/stars.svg"
      layout="responsive"
      width={500}
      height={500}
      alt="stars"
    /> */}
    {/* <Image src="/images/main/tent.svg" layout="fill" alt="landing background" /> */}
  </Box>
)

export default Landing
