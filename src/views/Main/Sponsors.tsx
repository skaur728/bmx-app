import { Box, Link, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'

import CockroachImg from '../../../public/images/sponsors/CockroachDBWebsiteLogo.svg'
import PurdueImg from '../../../public/images/sponsors/CompSci_H-Full-RGB.svg'
import DagsHubImg from '../../../public/images/sponsors/dagshub_light.svg'
import EcolabImg from '../../../public/images/sponsors/Ecolab.png'
import FordImg from '../../../public/images/sponsors/fordFundLogo.png'
import GoogleImg from '../../../public/images/sponsors/google-cloud-logo.png'
import JohnDeereImg from '../../../public/images/sponsors/john-deere-7.svg'
import KlaviyoImg from '../../../public/images/sponsors/klaviyo_black.png'
import BloombergImg from '../../../public/images/sponsors/New_Bloomberg_Logo.svg'
import PurdueEngImg from '../../../public/images/sponsors/Purdue_Logo_Engineering.png'
import SandiaImg from '../../../public/images/sponsors/sandia-national-laboratories-logo.png'
import SFABImg from '../../../public/images/sponsors/sfab.png'
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
        p: 4,
        mx: 10,
        pl: 15,
      }}
    >
      <Stack alignItems="center">
        <Stack direction="row">
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Sponsors
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ mt: 5 }}
          spacing={4}
          justifyContent="center"
        >
          <Stack sx={{ width: '350px' }}>
            <StyledLink
              href="https://boilerlink.purdue.edu/organization/SFAB"
              target="_blank"
            >
              <Image src={SFABImg} alt="SFAB logo" layout="responsive" />
            </StyledLink>
          </Stack>
          <Stack sx={{ width: '500px' }}>
            <StyledLink href="https://fordfund.org" target="_blank">
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
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.cockroachlabs.com/" target="_blank">
              <Image
                src={CockroachImg}
                alt="Cockroach DB logo"
                layout="responsive"
                height="700"
              />
            </StyledLink>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
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
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.ecolab.com/" target="_blank">
              <Image
                src={EcolabImg}
                alt="Ecolab logo"
                layout="fixed"
                height="50"
                width="150"
              />
            </StyledLink>
          </Stack>
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://dagshub.com/" target="_blank">
              <Image
                src={DagsHubImg}
                alt="DagsHub logo"
                layout="fixed"
                height="50"
                width="175"
              />
            </StyledLink>
          </Stack>
          <Stack justifyContent="center" sx={{ width: '250px' }}>
            <StyledLink href="https://www.klaviyo.com/" target="_blank">
              <Image
                src={KlaviyoImg}
                alt="Klaviyo logo"
                layout="fixed"
                height="120"
                width="120"
              />
            </StyledLink>
          </Stack>
          <Stack justifyContent="center">
            <StyledLink
              href="https://engineering.purdue.edu/Engr"
              target="_blank"
            >
              <Image
                src={PurdueEngImg}
                alt="Purdue Engineering logo"
                layout="fixed"
                height="60"
                width="220"
              />
            </StyledLink>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </Stack>
)

export default Sponsors
