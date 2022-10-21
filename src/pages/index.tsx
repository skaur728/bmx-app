import Head from '@/components/Head'
import HorizontalScroller from '@/components/HorizontalScroller'
import { Navbar } from '@/components/Navbar'
import { About, FAQ, Landing, Sponsors, Team, Testimonial } from '@/views/Main'
import Background from '@/views/Main/Background'

import type { NextPage } from 'next'

const Home: NextPage = () => (
  <>
    <Head title="BoilerMake X" />
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
  </>
)

export default Home
