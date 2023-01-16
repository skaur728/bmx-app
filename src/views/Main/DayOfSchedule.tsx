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
    eventOneTime: '5:00 PM',
    eventTwoTime: '6:00 PM',
    eventThreeTime: '7:30 PM',
    eventFourTime: '8:30 PM',
    eventFiveTime: '9:00 PM',
    eventSixTime: '9:00 PM',
    eventSevenTime: '',
    eventEightTime: '',
  },
  {
    label: 'Saturday, January 21',
    eventOne: 'Breakfast',
    eventTwo: 'Art Time Activity',
    eventThree: 'Tech Talks',
    eventFour: 'Lunch',
    eventFive: 'Zumba Event',
    eventSix: 'MLH Mini Event',
    eventSeven: 'Dinner',
    eventEight: 'Carnival Night',
    eventOneTime: '8:00 AM',
    eventTwoTime: '9:30 AM',
    eventThreeTime: '10:00 AM',
    eventFourTime: '12:00 PM',
    eventFiveTime: '2:00 PM',
    eventSixTime: '3:00 PM',
    eventSevenTime: '6:00 PM',
    eventEightTime: '8:00 PM',
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
    eventOneTime: '12:00 AM',
    eventTwoTime: '6:00 AM',
    eventThreeTime: '7:00 AM',
    eventFourTime: '9:30 AM',
    eventFiveTime: '11:30 AM',
    eventSixTime: '1:15 PM',
    eventSevenTime: '',
    eventEightTime: '',
  },
]

const DayOfSchedule = ({ uaString }: { uaString?: string }) => {
  const CollectionSize = Schedule.length
  const ua = useUserAgent(uaString || window.navigator.userAgent)
  const [index, setActiveStep] = React.useState(0)

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
  const { redirect } = useRedirect()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        marginRight: { xs: '80vw', sm: 0 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 850, sm: 1000, md: 1200 },
        }}
      >
        <Image
          src={EventBoardImg}
          layout="responsive"
          priority
          alt="Event board"
          style={{ pointerEvents: 'none' }}
        />
      </Box>
      <ThemeProvider theme={carnivalTheme}>
        <CssBaseline />
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 350, sm: 450, md: 500 },
            mt: 19,
            ml: 20,
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
      </ThemeProvider>
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 700, sm: 800, md: 900 },
          mt: 19,
          ml: 20,
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
          cursor: 'pointer',
          width: { xs: 50, sm: 75, md: 37 },
          mt: 18.3,
          ml: 127.4,
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
          cursor: 'pointer',
          width: { xs: 50, sm: 75, md: 37 },
          mt: -5.9,
          ml: 96.5,
        }}
        onClick={goToPrev}
      >
        <Image src={LeftButton} layout="responsive" alt="left" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 1.5,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 7.5,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 13.5,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 19.6,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 25.8,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 31.9,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 37.9,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
          width: { xs: 850, sm: 1000, md: 470 },
          height: 50,
          backgroundColor: '#FFC09D',
          border: 1,
          borderColor: '#000000',
          mt: 43.9,
          ml: 17.6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
            color: '#551600',
            textAlign: 'right',
            mr: 2,
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
