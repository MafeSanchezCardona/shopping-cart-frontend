import { createTheme, responsiveFontSizes } from '@mui/material';
import { blue, lightGreen, red, yellow } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121'
    },
    secondary: {
      light: '#8443d8',
      main: '#7f44d6',
      dark: '#7946d5'
    },
    error: {
      light: red[200],
      main: red[500],
      dark: red[800]
    },
    warning: {
      light: yellow[500],
      main: yellow[800],
      dark: yellow[900]
    },
    info: {
      light: blue[50],
      main: blue[400],
      dark: blue[700]
    },
    success: {
      light: lightGreen[500],
      main: lightGreen[700],
      dark: lightGreen[800]
    },
    background: {
      paper: '#303030',
      default: '#212121'
    }
  },
  typography: {
    fontFamily: "'Figtree','Helvetica', 'Arial', 'sans-serif'",
    fontSize: 12,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    subtitle1: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          'scrollbarColor': '#303030',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            borderRadius: 8,
            backgroundColor: '#424242',
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6a6a6a',
            minHeight: 24
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#6a6a6a'
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: `${150}ms ease`
        },

        contained: {
          'textTransform': 'none',
          'boxShadow': '0px 5px 15px 0px rgba(0,0,0,0.05)',
          'border': '1px solid transparent',
          '&:hover': {
            boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.15)',
            border: '1px solid #F0F0F0'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `${150}ms ease`
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      },
      styleOverrides: {
        root: {
          '&  .MuiOutlinedInput-root': {
            borderColor: '#F0F0F0'
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F0F0F0 !important',
            color: '#F0F0F0'
          },
          '&  .MuiFormHelperText-root.Mui-error': {
            fontSize: '0.75rem'
          }
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
