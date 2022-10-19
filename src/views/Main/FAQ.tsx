import { Box } from '@mui/material'
import Image from 'next/image'

import FAQAccordion from '@/components/FAQ/FAQAccordion'

import BannerImg from '../../../public/images/faq/faq-banner.svg'

import type { NextPage } from 'next'

const FAQ: NextPage = () => (
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
        width: '80vw',
        maxWidth: '1000px',
        maxHeight: '90vh',
      }}
    >
      <Image src={BannerImg} alt="Info Tent" layout="responsive" />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '30%',
          transform: 'translateX(-50%)',
        }}
      >
        <FAQAccordion />
      </Box>
    </Box>
  </Box>
)

export default FAQ
