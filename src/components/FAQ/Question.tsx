import { Box, Typography } from '@mui/material'
import { useState } from 'react'

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
        width: { xs: 250, sm: 300 },
        height: { xs: 125, sm: 150 },
        position: 'relative',
        cursor: 'pointer',
        perspective: '1000px',
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
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundImage: 'url(/images/faq/ticket.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        >
          <Typography
            sx={{
              pl: { xs: 4, sm: 5 },
              pr: 9,
              pt: { xs: 3 },
              fontSize: { xs: '1rem', sm: '1.2rem' },
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
            backgroundImage: 'url(/images/faq/ticket-flipped.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        >
          <Typography
            sx={{
              mt: { xs: 2, sm: 3 },
              pr: { xs: 3, sm: 4 },
              pl: { xs: 6.5, sm: 8 },
              zIndex: 1,
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
