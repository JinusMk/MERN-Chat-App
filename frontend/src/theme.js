import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#141214')(props),
    },
  }),
};

export const lightTheme = {
    primary: {
        300: '#ECEDF0',
        400: '#FDFDFF',
    },
    secondary: {
        300: '#646464',
        400: '#424242',
    },
    brand: {
        300: '#7C82FB',
        400: '#5F63FC',
    },
};

export const darkTheme = {
    primary: {
        300: '#646464',
        400: '#424242',
    },
    secondary: {
        300: '#ECEDF0',
        400: '#FDFDFF',
    },
    brand: {
        300: '#94d3ac',
        400: '#29c7ac',
    },
};



const overrides = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'work sans',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
  },
})

export default overrides