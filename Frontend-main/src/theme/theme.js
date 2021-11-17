import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#4DB6AC',
        },
        secondary: {
          main: '#4E5983',
        },
        error: {
          main: '#FF7A7A',
        },
        warning: {
          main: '#FFB100',
        },
        success: {
          main: '#4DB6AC',
        },
        info: {
          main: '#4E5983',
        },
        background: {
          default: '#fff',
        },
        text: {
          primary: '#181D33',
          secondary: '#868DAA',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.38)',
        },
    },
    typography: {
        fontFamily: 'PT Sans, Arial',
        h5:{
          fontFamily: 'PT Sans, Arial',
          fontSize:'26px',
          fontWeight:'700'
        },
        h6:{
          fontFamily: 'PT Sans, Arial',
          fontSize:'16px',
          fontWeight:'700',
          color:'rgba(24, 29, 51, 0.48)',
          textTransform:'uppercase'
        },
        subtitle1:{
          fontFamily: 'PT Sans, Arial',
          fontSize:'14px',
          color:'rgba(24, 29, 51, 0.48)',
          fontWeight:'400',
        }
    },
  });

  export default theme;