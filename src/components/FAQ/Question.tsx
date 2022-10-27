import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

import TicketImg from '../../../public/images/faq/ticket.svg'

import type { ReactNode } from 'react'

type Props = {
  question: string
  children: ReactNode
}

const Question = ({ question, children }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Box
      sx={{
        width: '350px',
        height: '175px',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => setIsFlipped((p) => !p)}
    >
      <Box
        className="inner"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 600ms',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'none',
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
          <Typography
            sx={{
              pl: 6,
              pr: 9,
              pt: 4,
              fontSize: '1.5rem',
            }}
          >
            {question}
          </Typography>
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
          <Typography sx={{ mt: 4, pr: 6, pl: 9 }}>{children}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Question
