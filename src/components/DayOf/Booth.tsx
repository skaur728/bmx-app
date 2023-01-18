import Image from 'next/image'

import TicketBoothImg from '../../../public/images/testimonials/ticket-booth.png'

const Booth = () => (
  <Image
    src={TicketBoothImg}
    layout="responsive"
    priority
    alt="Submit Booth"
    style={{ pointerEvents: 'none' }}
/>
)
export default Booth