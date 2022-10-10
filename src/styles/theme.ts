import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overscrollBehavior: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MoxOsxFontSmoothing: 'grayscale',
        },

        '@font-face': {
          fontFamily: 'SpringFair',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: 'url("/assets/fonts/SpringFair.ttf")',
        },
      },
    },
  },
  typography: {
    button: { textTransform: 'none' },
    fontFamily: '"Smythe", cursive',
  },
})

export default responsiveFontSizes(theme)
