import Image from 'next/image'

import AboutSignImg from '../../../public/images/about/about-sign.svg'

const AboutSign = () => (
  <Image
    src={AboutSignImg}
    alt="About BM Sign"
    layout="responsive"
    style={{ pointerEvents: 'none' }}
  />
)

export default AboutSign
