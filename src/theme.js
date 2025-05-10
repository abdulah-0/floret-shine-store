// src/theme.js
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#000', paper: '#000' },
    text: { primary: '#fff' },
    primary: { main: '#fff' },     // white buttons
    secondary: { main: '#888' },   // subdued links
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
});

export default theme;
