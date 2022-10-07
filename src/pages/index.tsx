import { Navbar } from '@/components/Navbar'
import { About, FAQ, Landing, Sponsors, Team, Testimonial } from '@/views/Main'

import type { NextPage } from 'next'

const Home: NextPage = () => (
  <>
    {/* <Navbar /> */}
    <Landing />
    <About />
    <FAQ />
    <Testimonial />
    <Team />
    <Sponsors />
  </>
)

export default Home
