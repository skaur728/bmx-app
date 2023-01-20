import { ThemeProvider } from '@emotion/react'
import {
  Box,
  Button,
  CssBaseline,
  Link,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'
import React from 'react'
import { toHTML } from 'slack-markdown'

import useRedirect from '@/hooks/useRedirect'

import EventBoardImg from '../../../public/images/dayOf/event_board.svg'
import LeftButton from '../../../public/images/dayOf/left.svg'
import RightButton from '../../../public/images/dayOf/right.svg'

import type { NextPageContext } from 'next'

const carnivalTheme = createTheme({
  typography: {
    fontFamily: '"Carnival", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Carnival',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: 'url("/assets/fonts/CarnivalRimmed.ttf")',
        },
      },
    },
  },
})

const Schedule = [
  {
    label: 'Friday, January 20',
    eventOne: 'Check in Begins',
    eventTwo: 'Icebreakers',
    eventThree: 'Opening Ceremony',
    eventFour: 'Team Building',
    eventFive: 'Dinner',
    eventSix: 'Hacking Begins',
    eventSeven: '',
    eventEight: '',
    eventNine: '',
    eventOneTime: '5:00 PM',
    eventTwoTime: '6:00 PM',
    eventThreeTime: '7:30 PM',
    eventFourTime: '8:30 PM',
    eventFiveTime: '9:00 PM',
    eventSixTime: '9:00 PM',
    eventSevenTime: '',
    eventEightTime: '',
    eventNineTime: '',
    eventsInfo: [
      `Location: Front of west gym\n entrance doors connecting Co-Rec\n to outside`,
      'Location: Feature Gym',
      'Location: Feature Gym',
      'Location: Gym 6',
      'Location: Gym 4 \nDinner from Christos: Fajita Bar',
      '',
      '',
      '',
      '',
    ],
  },
  {
    label: 'Saturday, January 21',
    eventOne: 'Breakfast',
    eventTwo: 'Art Time Activity',
    eventThree: 'Tech Talks',
    eventFour: 'Lunch',
    eventFive: 'Zumba Event',
    eventSix: 'MLH Mini Event',
    eventSeven: 'Dogs Event',
    eventEight: 'Dinner',
    eventNine: 'Carnival Night',
    eventOneTime: '8:00 AM',
    eventTwoTime: '9:30 AM',
    eventThreeTime: '10:00 AM',
    eventFourTime: '12:00 PM',
    eventFiveTime: '2:00 PM',
    eventSixTime: '3:00 PM',
    eventSevenTime: '5:00 PM',
    eventEightTime: '6:00 PM',
    eventNineTime: '8:00 PM',
    eventsInfo: [
      `Location: Gym 4\n Hot Breakfast from Christos`,
      'Join us for fun art activities!\n Origami, coloring, crafts, etc.',
      'Location: Conference Room\nCockroach DB Tech Talk: 10 AM\nDagsHub Tech Talk: 11 AM',
      'Location: Gym 4\n Lunch from Christos: \nStir-fry buffet, veggie potstickers,\n eggrolls ',
      'Location: Gym 6',
      'Location: Gym 6\n Snyk Cybersecurity Challenge:\n 3PM\n Bob Ross Paint Challenge: 4PM',
      'Location: Gyms 1-3',
      'Location: Gym 4\nDinner from Hotbox: Pizza',
      'Location: Feature Gym\n Join us for carnival activities!\nCornhole, Ring Toss, \nWheel of Fortune, etc.',
    ],
  },
  {
    label: 'Sunday, January 22',
    eventOne: 'Super Smash Bros Tournament',
    eventTwo: 'Hacking Ends',
    eventThree: 'Breakfast',
    eventFour: 'Judging',
    eventFive: 'Lunch',
    eventSix: 'Closing Ceremony',
    eventSeven: '',
    eventEight: '',
    eventNine: '',
    eventOneTime: '12:00 AM',
    eventTwoTime: '6:00 AM',
    eventThreeTime: '7:00 AM',
    eventFourTime: '9:00 AM',
    eventFiveTime: '11:30 AM',
    eventSixTime: '1:15 PM',
    eventSevenTime: '',
    eventEightTime: '',
    eventNineTime: '',
    eventsInfo: [
      `Location: Gym 6\nThe ultimate smash tournament!`,
      '',
      'Location: Gym 4\n Hot Breakfast from Christos',
      'Location: At your individual tables\nGet ready to demo your projects!',
      'Location: Gym 4\n Lunch from Christos: \nBoxed Lunches - Sandwiches',
      'Location: Feature Gym',
      '',
      '',
      '',
    ],
  },
]

const DayOfSchedule = ({ uaString }: { uaString?: string }) => {
  const CollectionSize = Schedule.length
  const ua = useUserAgent(uaString || window.navigator.userAgent)
  const [index, setActiveStep] = React.useState(0)
  const [selection, setSelection] = React.useState(0)

  const goToNext = () => {
    if (index < CollectionSize - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  const goToPrev = () => {
    if (index > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }
  const eventOneHandler = () => {
    setSelection(0)
  }
  const eventTwoHandler = () => {
    setSelection(1)
  }
  const eventThreeHandler = () => {
    setSelection(2)
  }
  const eventFourHandler = () => {
    setSelection(3)
  }
  const eventFiveHandler = () => {
    setSelection(4)
  }
  const eventSixHandler = () => {
    setSelection(5)
  }
  const eventSevenHandler = () => {
    setSelection(6)
  }
  const eventEightHandler = () => {
    setSelection(7)
  }
  const eventNineHandler = () => {
    setSelection(8)
  }
  const { redirect } = useRedirect()

  return (
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
          width: { xs: 750, sm: 1000, md: 1200 },
          bottom: 0,
          maxHeight: '95vh',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={EventBoardImg}
            layout="responsive"
            priority
            alt="Submit Booth"
            style={{ pointerEvents: 'none' }}
          />

          <Box
            sx={{
              position: 'absolute',
              width: { xs: 350, sm: 450, md: 500 },
              top: '10%',
              left: '7%',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Carnival, sans-serif',
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
              }}
            >
              EVENT SCHEDULE
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 700, sm: 800, md: 900 },
              top: '10%',
              right: '7.75%',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                ml: 82.3,
              }}
            >
              {Schedule[index].label}
            </Typography>
          </Box>
          <Box
            sx={{
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 25, sm: 30, md: 37 },
              top: '9.5%',
              right: '6.5%',
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={goToNext}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 25, sm: 30, md: 37 },
              top: '9.5%',
              right: '30.5%',
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={goToPrev}
          >
            <Image src={LeftButton} layout="responsive" alt="left" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '17.5%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventOne}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventOneTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '18%',
              right: '49.5%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventOneHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '23.75%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventTwo}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventTwoTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '24%',
              right: '49.5%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventTwoHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '30.5%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventThree}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventThreeTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '31.2%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventThreeHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '37.2%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventFour}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventFourTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '37.7%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventFourHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '43.5%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventFive}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventFiveTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '43.8%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventFiveHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '49.3%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventSix}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventSixTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '49.5%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventSixHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '55.5%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventSeven}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventSevenTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '56%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventSevenHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '62.2%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventEight}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventEightTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '63%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventEightHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 400, sm: 430, md: 545 },
              height: 52,
              backgroundColor: '#FFC09D',
              border: 1,
              borderColor: '#000000',
              top: '68.8%',
              left: '5%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'right',
                mr: 4,
              }}
            >
              {Schedule[index].eventNine}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                color: '#551600',
                textAlign: 'left',
                mt: -5,
                ml: 1,
              }}
            >
              {Schedule[index].eventNineTime}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              transition: 'transform 250ms ease',
              '&:hover': {
                transform: 'scale(1.04)',
              },
              width: { xs: 20, sm: 25, md: 30 },
              top: '69.5%',
              right: '49.8%',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={eventNineHandler}
          >
            <Image src={RightButton} layout="responsive" alt="right" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 1200, sm: 1300, md: 1500 },
              top: '15%',
              left: '-2%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { sm: '1rem', md: '2rem', lg: '3rem' },
                color: '#551600',
                ml: 82.3,
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: toHTML(Schedule[index].eventsInfo[selection]),
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          bottom: 0,
          maxHeight: '80vh',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            maxHeight: '80vh',
            width: { xs: 850, sm: 1000, md: 1200 },
          }}
        />
      </Box>
    </Box>
  )
}

export default DayOfSchedule

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
