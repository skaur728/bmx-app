import { Box } from '@mui/material'

import HorizontalScroller from '@/components/HorizontalScroller'
import { Navbar } from '@/components/Navbar'
import { About, FAQ, Landing, Sponsors, Team, Testimonial } from '@/views/Main'
import Background from '@/views/Main/Background'

import type { NextPage } from 'next'

const Home: NextPage = () => (
  <Box>
    {/* <Navbar /> */}
    <Background />
    <HorizontalScroller>
      <Landing />
      <About />
      <FAQ />
      {/* <Testimonial /> */}
      {/* <Team /> */}
      {/* <Sponsors /> */}
    </HorizontalScroller>
  </Box>
)

export default Home
