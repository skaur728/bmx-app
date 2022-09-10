import { createTheme } from '@mui/material/styles'

// import Colombia from '../../public/assets/fonts/Colombia'
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
          fontFamily: 'Colombina',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: 'url("/assets/fonts/Colombina.ttf")',
          unicodeRange:
            'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        },
      },
    },
  },
  typography: {
    button: { textTransform: 'none' },
    fontFamily: 'Colombina',
  },
})

export default theme
