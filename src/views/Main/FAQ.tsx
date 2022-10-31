import { Box, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { Question } from '@/components/FAQ'

import BannerImg from '../../../public/images/faq/banner.svg'
import PillarImg from '../../../public/images/faq/pillar.svg'

import type { NextPage } from 'next'

const FAQ: NextPage = () => (
  <Box my={5} mx={10}>
    <Stack justifyContent="center" my={{ xs: 5 }}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          sx={{
            width: '80%',
            maxWidth: { xs: 650, sm: 1100 },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
          }}
        >
          <Image
            src={BannerImg}
            alt="pillar"
            layout="responsive"
            style={{ pointerEvents: 'none' }}
          />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2rem', md: '3rem' },
            }}
          >
            <b>F</b>requently <b>A</b>sked <b>Q</b>uestions
          </Typography>
        </Box>
      </Box>
    </Stack>

    <Stack spacing={3} mt={3}>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Question question="Is BoilerMake X free?">
          Yes! BoilerMake is completely free for all attendees.
        </Question>

        <Question question="Will BoilerMake be in person?">
          Yes, BoilerMake X will be in person. Stay tuned for more information!
        </Question>

        <Question question="How large can my team be?">
          You can have a maximum of 4 people on your team.
        </Question>
      </Stack>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Question question="My team was accepted and I wasn't - can I attend?">
          <Typography
            component="span"
            sx={{ fontSize: { xs: '0.8em', sm: '1em' } }}
          >
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

        <Question question="Do you allow walk-ins and last minute registration?">
          We accept walk-ins based on availability after hacker check-in. More
          details will be announced closer to the event!
        </Question>

        <Question question="What if I don't know how to code?">
          <Typography
            component="span"
            sx={{ fontSize: { xs: '0.6em', sm: '0.75em', xl: '1em' } }}
          >
            No problem! You can learn alongside others with resources such as
            tech talks, a Slack workplace to ask questions, and engineers from
            sponsoring companies to help you build something you can be proud
            of.
          </Typography>
        </Question>
      </Stack>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Question question="What are the requirements to attend?">
          BoilerMake is open to all undergraduate college students who are of
          age 18 or older.
        </Question>

        <Question question="I missed the deadline to apply - can I attend?">
          <Typography
            component="span"
            sx={{ fontSize: { xs: '0.8em', sm: '0.9rem' } }}
          >
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

  // <Grid container p={10} sx={{ width: '100vw' }}>
  //   <Grid item xs={4}>
  //     <Box sx={{ position: 'relative' }}>
  //       <Box sx={{ position: 'absolute', width: '100%' }}>
  //         <Image
  //           src={BannerImg}
  //           alt="pillar"
  //           layout="responsive"
  //           style={{ pointerEvents: 'none' }}
  //         />
  //       </Box>
  //       <Box
  //         sx={{
  //           position: 'absolute',
  //           left: '50%',
  //           top: '60%',
  //           transform: 'translate(-50%, -50%)',
  //         }}
  //       >
  //         <Typography
  //           sx={{
  //             fontSize: { xs: '2rem', sm: '2rem' },
  //           }}
  //         >
  //           <b>F</b>requently <b>A</b>sked <b>Q</b>uestions
  //         </Typography>
  //       </Box>
  //     </Box>
  //   </Grid>

  //   <Grid item xs={4}>
  //     <Question question="Is BoilerMake X free?">
  //       Yes! BoilerMake is completely free for all attendees.
  //     </Question>
  //   </Grid>

  //   <Grid item xs={4}>
  //     <Question question="What if I don't know how to code?">
  //       <Typography component="span" sx={{ fontSize: '1em' }}>
  //         No problem! You can learn alongside others with resources such as tech
  //         talks, a Slack workplace to ask questions, and engineers from
  //         sponsoring companies to help you build something you can be proud of.
  //       </Typography>
  //     </Question>
  //   </Grid>

  //   <Grid item xs={4}>
  //     <Question question="Will BoilerMake be in person?">
  //       Yes, BoilerMake X will be in person. Stay tuned for more information!
  //     </Question>
  //   </Grid>

  //   <Grid item xs={4}>
  //     <Question question="How large can my team be?">
  //       You can have a maximum of 4 people on your team.
  //     </Question>
  //   </Grid>
  //   <Grid item xs={4}>
  //     <Question question="What are the requirements to attend?">
  //       BoilerMake is open to all undergraduate college students who are of age
  //       18 or older.
  //     </Question>
  //   </Grid>

  //   <Grid item xs={4}>
  //     <Question question="My team was accepted and I wasn't - can I attend?">
  //       Feel free to email{' '}
  //       <a
  //         href="mailto:team@boilermake.org"
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         team@boilermake.org
  //       </a>{' '}
  //       for info about our waitlist, and we will do our best to accommodate you
  //       as space opens up at our event.
  //     </Question>
  //   </Grid>
  //   <Grid item xs={4}>
  //     <Question question="Will BoilerMake be in person?">
  //       Yes, BoilerMake X will be in person. Stay tuned for more information!
  //     </Question>
  //   </Grid>
  //   <Grid item xs={4}>
  //     <Question question="Do you allow walk-ins and last minute registration?">
  //       We accept walk-ins based on availability after hacker check-in. More
  //       details will be announced closer to the event!
  //     </Question>
  //   </Grid>
  //   <Grid item xs={4}>
  //     <Question question="I missed the deadline to apply - can I attend?">
  //       <Typography component="span" sx={{ fontSize: '0.9rem' }}>
  //         Feel free to email{' '}
  //         <a
  //           href="mailto:team@boilermake.org"
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           team@boilermake.org
  //         </a>{' '}
  //         for info about our waitlist, and we will do our best to accommodate
  //         you as space opens up at our event.
  //       </Typography>
  //     </Question>
  //   </Grid>
  //   <Grid item xs={4}>
  //     <Question question="What if I have any other questions?">
  //       <Typography component="span" sx={{ fontSize: '1.3rem' }}>
  //         Please email us at{' '}
  //         <a
  //           href="mailto:team@boilermake.org"
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           team@boilermake.org
  //         </a>
  //         !
  //       </Typography>
  //     </Question>
  //   </Grid>
  // </Grid>
)

export default FAQ
