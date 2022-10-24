import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import TicketImg from '../../../public/images/faq/ticket.svg'

type Props = {
  question: string
  answer: string
}

const Question = ({ question, answer }: Props) => (
  <Box
    sx={{
      width: '300px',
      height: '150px',
      position: 'relative',
      cursor: 'pointer',
      '&:hover .inner': {
        transform: 'rotateY(180deg)',
      },
    }}
  >
    <Box
      className="inner"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transition: 'transform 600ms',
        transformStyle: 'preserve-3d',
      }}
    >
      <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Image
          src={TicketImg}
          alt="ticket"
          layout="responsive"
          style={{ pointerEvents: 'none' }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <Typography sx={{ mt: 4, pl: 6, pr: 9 }}>{question}</Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <Typography sx={{ mt: 4, pr: 6, pl: 9 }}>{answer}</Typography>
      </Box>
    </Box>
  </Box>
)

export default Question
