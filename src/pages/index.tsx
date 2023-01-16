import Head from '@/components/Head'
import HorizontalScroller from '@/components/HorizontalScroller'
import { Navbar } from '@/components/Navbar'
import TopNav from '@/components/TopNav'
import {
  About,
  DayOfLand,
  DayOfSchedule,
  FAQ,
  Landing,
  Sponsors,
  Team,
  Testimonial,
} from '@/views/Main'
import Background from '@/views/Main/Background'

import type { NextPage } from 'next'

const Home: NextPage = () => (
  <>
    <Head title="BoilerMake X" />
    <TopNav />
    {/* <Navbar /> */}
    <Background />
    <HorizontalScroller>
      {/* <Landing /> */}
      <DayOfLand />
      <DayOfSchedule />
      {/* <About /> */}
      {/* <Sponsors /> */}

      <FAQ />
      {/* <Testimonial /> */}
      {/* <Team /> */}
    </HorizontalScroller>
  </>
)

export default Home
