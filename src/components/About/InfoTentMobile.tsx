import Image from 'next/image'

import InfoTentImg from '../../../public/images/about/info-tent-mobile.svg'

const InfoTentMobile = () => (
  <Image
    src={InfoTentImg}
    alt="About BM Sign"
    layout="responsive"
    style={{ pointerEvents: 'none' }}
  />
)

export default InfoTentMobile
