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
        width: { xs: '250px', sm: '350px' },
        height: { xs: 125, sm: 175 },
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
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            // backgroundColor: '#c5c5c5',
          }}
        >
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
              pl: { xs: 4, sm: 6 },
              pr: 9,
              pt: { xs: 3, sm: 4 },
              fontSize: { xs: '1rem', sm: '1.5rem' },
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
          <Typography
            sx={{
              mt: { xs: 2, sm: 4 },
              pr: { xs: 3, sm: 6 },
              pl: { xs: 6.5, sm: 9 },
            }}
          >
            {children}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Question
