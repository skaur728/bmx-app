import { Box, Stack } from '@mui/material'

enum Decision {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
  Waitlisted = 'Waitlisted',
}

type Props = {
  decision: Decision
  rsvp?: boolean
}

const ApplicationStatus = ({ decision, rsvp }: Props) => (
  <Stack
    direction="row"
    sx={{
      backgroundColor: '#fde2bd',
      borderRadius: '40px',
      padding: '2px 12px',
      fontSize: '1.2rem',
      border: '2px solid #ebca9f',
    }}
    alignItems="center"
  >
    <Box
      sx={{
        borderRadius: '50%',
        width: 20,
        height: 20,
        border: '2px solid #ffffff61',
        backgroundColor: (() => {
          switch (decision) {
            case Decision.Accepted: {
              if (rsvp === undefined) return '#aeea00'
              return '#5daa60'
            }
            case Decision.Pending: {
              return '#ffa726'
            }
            case Decision.Rejected: {
              return '#c4372c'
            }
            case Decision.Waitlisted: {
              return '#26a5df'
            }
            default:
              return 'gray'
          }
        })(),
        mr: 1,
      }}
    />
    <Box>
      {decision}
      {rsvp === undefined && decision === Decision.Accepted ? (
        <span style={{ fontSize: '0.75em' }}> (RSVP required)</span>
      ) : (
        ''
      )}
    </Box>
  </Stack>
)

export default ApplicationStatus
