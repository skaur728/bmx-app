import { Stack, Typography, styled } from '@mui/material'
import Link from 'next/link'

interface Props {
  sticky?: boolean
}

type StickyWrapperType = {
  sticky: boolean | number
}

const StickyWrapper = styled(Stack)<StickyWrapperType>(({ sticky }) => ({
  position: sticky ? 'fixed' : 'static',
  width: '100%',
  padding: '15px 20px',
  border: '1px solid black',
  background: 'white',
}))

const Navbar = ({ sticky = true }: Props) => (
  <StickyWrapper sticky={sticky ? 1 : 0} direction="row" spacing={3}>
    <Typography variant="h6">bmx logo</Typography>
    <Link href="/#landing">
      <Typography variant="h6">Home</Typography>
    </Link>
    <Link href="/#about">
      <Typography variant="h6">About</Typography>
    </Link>
    <Typography variant="h6">FAQ</Typography>
    <Typography variant="h6">Testimonials</Typography>
    <Typography variant="h6">Team</Typography>
    <Typography variant="h6">Sponsors</Typography>
  </StickyWrapper>
)

export default Navbar
