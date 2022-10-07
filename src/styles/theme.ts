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
          scrollBehavior: 'smooth',
        },
        '@font-face': {
          fontFamily: 'SpringFair',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: 'url("/assets/fonts/SpringFair.ttf")',
        },
        fallbacks: [
          {
            '@font-face': {
              fontFamily: 'Colombina',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 500,
              src: 'url("/assets/fonts/Colombina.ttf") format("truetype")',
            },
          },
          {
            '@font-face': {
              fontFamily: 'PlayFair',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 'normal',
              src: 'url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap")',
            },
          },
          {
            '@font-face': {
              fontFamily: 'Copperplate',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 'normal',
              src: 'url("/assets/fonts/Copperplate.ttf") format("truetype")',
            },
          },
        ],
      },
    },
  },
  typography: {
    button: { textTransform: 'none' },
    fontFamily: 'Colombina',
  },
})

export default responsiveFontSizes(theme)
