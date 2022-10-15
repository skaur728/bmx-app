import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material'
import Image from 'next/image'

import FAQAccordion from '@/components/FAQ/FAQAccordion'

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
      }}
    >
      <Image
        src="/images/faq/faq-banner.png"
        alt="Info Tent"
        width={1920}
        height={1615}
        layout="responsive"
      />
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
