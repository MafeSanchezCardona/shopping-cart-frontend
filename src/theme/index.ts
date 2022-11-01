import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light'
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
  }
});

theme = responsiveFontSizes(theme);

export default theme;
