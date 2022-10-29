import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import PurdueImg from '../../../public/images/sponsors/CompSci_H-Full-RGB.svg'
import EcolabImg from '../../../public/images/sponsors/ecolabLogo.png'
import FordImg from '../../../public/images/sponsors/ford-2.png'
import GoogleImg from '../../../public/images/sponsors/google-cloud-logo.png'
import JohnDeereImg from '../../../public/images/sponsors/john-deere-7.svg'
import BloombergImg from '../../../public/images/sponsors/New_Bloomberg_Logo.svg'
import SandiaImg from '../../../public/images/sponsors/sandia-national-laboratories-logo.png'
import WolframImg from '../../../public/images/sponsors/Wolfram_Alpha_2022.png'

import type { NextPage } from 'next'

const Sponsors: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        backgroundColor: '#fde2bd',
        borderRadius: '40px',
        padding: '2px 12px',
        fontSize: '1.2rem',
        border: '2px solid #ebca9f',
        height: '80vh',
        width: '60vw',
        marginTop: '70px',
        marginLeft: '80px',
      }}
    >
      <Stack alignItems="center" spacing={0}>
        <Stack direction="row">
          <Typography sx={{ fontSize: '4vw', textAlign: 'center' }}>
            Sponsors
          </Typography>
        </Stack>
        <br />
        <Stack direction="row">
          <Image
            src={FordImg}
            alt="Ford logo"
            layout="fixed"
            height="100"
            width="250"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <Image
            src={PurdueImg}
            alt="Purdue logo"
            layout="fixed"
            height="250"
            width="250"
          />
          <Image
            src={JohnDeereImg}
            alt="John Deere logo"
            layout="fixed"
            height="250"
            width="250"
          />
          <Image
            src={BloombergImg}
            alt="Bloomberg logo"
            layout="fixed"
            height="250"
            width="250"
          />
        </Stack>
        <Stack direction="row" gap={4}>
          <Image
            src={WolframImg}
            alt="Wolfram logo"
            layout="fixed"
            height="50"
            width="150"
          />
          <Image
            src={GoogleImg}
            alt="Google logo"
            layout="fixed"
            height="45"
            width="150"
          />
          <Image
            src={SandiaImg}
            alt="Sandia logo"
            layout="fixed"
            height="50"
            width="100"
          />
          <Image
            src={EcolabImg}
            alt="Ecolab logo"
            layout="fixed"
            height="50"
            width="100"
          />
        </Stack>
      </Stack>
    </Box>
  </Box>
)

export default Sponsors
