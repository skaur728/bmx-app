import { Button, styled } from '@mui/material'

export default styled(Button)({
  padding: '10px 40px',
  borderRadius: '50px',
  backgroundColor: '#893422',
  color: '#ffe8c9',
  boxShadow:
    'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
  transition: 'transform 0.25s ease',
  '&:hover': {
    backgroundColor: '#792d1e',
    transform: 'scale(1.04)',
  },
  '&:active': {
    transform: 'scale(1)',
  },

  '&.Mui-disabled': {
    color: '#ffe8c999',
    boxShadow: 'none',
    backgroundColor: '#7e2f1fb0',
    pointerEvents: 'none',
  },
})
