import { red } from '@mui/material/colors'; // added import statement
import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// declare module '@mui/material/styles' {
//   interface Palette {
//     primaryLight: Palette['primary'];
//   }
//   interface PaletteOptions {
//     primaryLight: PaletteOptions['primary'];
//   }
// }

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#3B73ED', // generate a lighter shade
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    // primaryLight: {
    //   main: '#25632B',
    // },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
