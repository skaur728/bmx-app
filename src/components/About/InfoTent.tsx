import Image from 'next/image'

import InfoTentImg from '../../../public/images/about/info-tent.svg'

const InfoTent = () => (
  <Image
    src={InfoTentImg}
    alt="Info Tent"
    layout="responsive"
    style={{ pointerEvents: 'none' }}
  />
)

export default InfoTent
