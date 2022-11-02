import { Box, Link, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'

import PurdueImg from '../../../public/images/sponsors/CompSci_H-Full-RGB.svg'
import EcolabImg from '../../../public/images/sponsors/ecolabLogo.png'
import FordImg from '../../../public/images/sponsors/fordFundLogo.png'
import GoogleImg from '../../../public/images/sponsors/google-cloud-logo.png'
import JohnDeereImg from '../../../public/images/sponsors/john-deere-7.svg'
import BloombergImg from '../../../public/images/sponsors/New_Bloomberg_Logo.svg'
import SandiaImg from '../../../public/images/sponsors/sandia-national-laboratories-logo.png'
import WolframImg from '../../../public/images/sponsors/Wolfram_Alpha_2022.png'

import type { NextPage } from 'next'

const StyledLink = styled(Link)({
  width: '100%',
  transition: 'transform 200ms ease',
  '&:hover': {
    transform: 'scale(1.04)',
  },

  '&:active': {
    transform: 'scale(1)',
  },
})

const Sponsors: NextPage = () => (
  <Stack alignItems="center" justifyContent="center">
    <Box
      sx={{
        backgroundColor: '#fde2bd',
        borderRadius: '40px',
        fontSize: '1.2rem',
        border: '2px solid #ebca9f',
        p: 10,
        mx: 10,
      }}
    >
      <Stack alignItems="center">
        <Stack direction="row">
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Sponsors
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ mt: 5 }} justifyContent="center">
          <Stack sx={{ width: '500px' }}>
            <StyledLink href="https://ford.com" target="_blank">
              <Image src={FordImg} alt="Ford logo" layout="responsive" />
            </StyledLink>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4} sx={{ my: 10 }}>
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.cs.purdue.edu/" target="_blank">
              <Image src={PurdueImg} alt="Purdue logo" layout="responsive" />
            </StyledLink>
          </Stack>

          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink
              href="https://www.deere.com/en/index.html"
              target="_blank"
            >
              <Image
                src={JohnDeereImg}
                alt="John Deere logo"
                layout="responsive"
              />
            </StyledLink>
          </Stack>

          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.bloomberg.com/" target="_blank">
              <Image
                src={BloombergImg}
                alt="Bloomberg logo"
                layout="responsive"
              />
            </StyledLink>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4} justifyContent="center">
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.wolframalpha.com/" target="_blank">
              <Image
                src={WolframImg}
                alt="Wolfram logo"
                layout="fixed"
                height="50"
                width="200"
              />
            </StyledLink>
          </Stack>

          {/* <StyledLink href="https://cloud.google.com" target="_blank">
            <Image
              src={GoogleImg}
              alt="Google logo"
              layout="fixed"
              height="45"
              width="200"
            />
          </StyledLink> */}
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.sandia.gov" target="_blank">
              <Image
                src={SandiaImg}
                alt="Sandia logo"
                layout="fixed"
                height="50"
                width="150"
              />
            </StyledLink>
          </Stack>

          {/* <StyledLink href="https://www.ecolab.com/" target="_blank">
            <Image
              src={EcolabImg}
              alt="Ecolab logo"
              layout="fixed"
              height="50"
              width="150"
            />
          </StyledLink> */}
        </Stack>
      </Stack>
    </Box>
  </Stack>
)

export default Sponsors
