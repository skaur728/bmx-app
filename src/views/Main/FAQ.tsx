import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { Question } from '@/components/FAQ'

import BannerImg from '../../../public/images/faq/banner.svg'
import PillarImg from '../../../public/images/faq/pillar.svg'

import type { NextPage } from 'next'

const FAQ: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      width: { xs: '200vw', sm: '100vw' },
      position: 'relative',
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        maxWidth: '1200px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200px',
          maxHeight: '98vh',
        }}
      >
        <Image
          src={PillarImg}
          alt="pillar"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '200px',
          maxHeight: '98vh',
        }}
      >
        <Image
          src={PillarImg}
          alt="pillar"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110%',
        }}
      >
        <Image
          src={BannerImg}
          alt="pillar"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
          >
            <b>F</b>requently <b>A</b>sked <b>Q</b>uestions
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Question answer="Answer to question 1" question="Question 1" />
    </Box>
  </Box>
)

export default FAQ
