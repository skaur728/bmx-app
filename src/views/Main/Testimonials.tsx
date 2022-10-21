import { Box } from '@mui/material'
import Image from 'next/image'

import type { NextPage } from 'next'

const Testimonials: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '30vw',
      }}
    >
      <Image
        src="/images/testimonials/ticket-booth.png"
        alt="Info Tent"
        width={1920}
        height={2351}
        layout="responsive"
      />
    </Box>
  </Box>
)

export default Testimonials
