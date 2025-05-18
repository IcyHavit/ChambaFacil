// src/theme.js
import { createTheme } from '@mui/material/styles';

const bodyLarge = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '3rem', // tamaño mayor (~20px)
  fontWeight: 400,
};

const bodySmall = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1rem', // tamaño menor (~14px)
  fontWeight: 400,
};

const theme = createTheme({
  palette: {
    primary: { main: '#4c9b82' },
    secondary: { main: '#495a72' },
    tertiary: { main: '#ffffff' },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
  },
  typography: {
    bodyLarge,
    bodySmall,
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
