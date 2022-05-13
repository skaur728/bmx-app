import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    button: { textTransform: 'none' },
  },
})

export default theme
