import Container from '@mui/material/Container'

import { About, FAQ, Landing, Sponsors, Team, Testimonial } from '@/views/Main'

import type { NextPage } from 'next'

const Home: NextPage = () => (
  <Container maxWidth="lg">
    <Landing />
    <About />
    <FAQ />
    <Testimonial />
    <Team />
    <Sponsors />
  </Container>
)

export default Home
