import { Box, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { Question } from '@/components/FAQ'

import BannerImg from '../../../public/images/faq/banner.svg'
import PillarImg from '../../../public/images/faq/pillar.svg'

import type { NextPage } from 'next'

const FAQ: NextPage = () => (
  <Box
    sx={{
      height: '100vh',
      // width: { xs: '200vw', sm: '250vw', lg: '100vw' },
      position: 'relative',
    }}
  >
    <Stack
      justifyContent="flex-end"
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        // maxWidth: '1500px',
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
          // backgroundImage: 'url(/images/faq/banner.svg)',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'contain',
          // backgroundPosition: 'center',
        }}
      >
        <Box>
          <Image
            src={BannerImg}
            alt="pillar"
            layout="fill"
            style={{ pointerEvents: 'none' }}
          />
        </Box>
        <Box
          sx={{
            // position: 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
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

      <Stack justifyContent="center" direction="row" spacing={2}>
        <Question question="Is BoilerMake X free?">
          Yes! BoilerMake is completely free for all attendees.
        </Question>

        <Question question="What if I don't know how to code?">
          <Typography component="span" sx={{ fontSize: '1em' }}>
            No problem! You can learn alongside others with resources such as
            tech talks, a Slack workplace to ask questions, and engineers from
            sponsoring companies to help you build something you can be proud
            of.
          </Typography>
        </Question>

        <Question question="Will BoilerMake be in person?">
          Yes, BoilerMake X will be in person. Stay tuned for more information!
        </Question>

        <Question question="How large can my team be?">
          You can have a maximum of 4 people on your team.
        </Question>

        <Question question="What are the requirements to attend?">
          BoilerMake is open to all undergraduate college students who are of
          age 18 or older.
        </Question>
      </Stack>
      <Stack justifyContent="center" direction="row" spacing={2} my={2}>
        <Question question="My team was accepted and I wasn't - can I attend?">
          Feel free to email{' '}
          <a
            href="mailto:team@boilermake.org"
            onClick={(e) => e.stopPropagation()}
          >
            team@boilermake.org
          </a>{' '}
          for info about our waitlist, and we will do our best to accommodate
          you as space opens up at our event.
        </Question>

        <Question question="Will BoilerMake be in person?">
          Yes, BoilerMake X will be in person. Stay tuned for more information!
        </Question>

        <Question question="Do you allow walk-ins and last minute registration?">
          We accept walk-ins based on availability after hacker check-in. More
          details will be announced closer to the event!
        </Question>

        <Question question="I missed the deadline to apply - can I attend?">
          <Typography component="span" sx={{ fontSize: '0.9rem' }}>
            Feel free to email{' '}
            <a
              href="mailto:team@boilermake.org"
              onClick={(e) => e.stopPropagation()}
            >
              team@boilermake.org
            </a>{' '}
            for info about our waitlist, and we will do our best to accommodate
            you as space opens up at our event.
          </Typography>
        </Question>

        <Question question="What if I have any other questions?">
          <Typography component="span" sx={{ fontSize: '1.3rem' }}>
            Please email us at{' '}
            <a
              href="mailto:team@boilermake.org"
              onClick={(e) => e.stopPropagation()}
            >
              team@boilermake.org
            </a>
            !
          </Typography>
        </Question>
      </Stack>
    </Stack>
  </Box>
)

export default FAQ
