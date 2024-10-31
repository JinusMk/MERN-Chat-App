import { extendTheme } from '@chakra-ui/react';
// import '@fontsource/inter';

const COLORS = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  googleBlue: '#4285f4',
  facebookBlue: '#1877f2',
  overlayDark: {
    50: 'rgba(0, 0, 0, 0.05)',
    100: 'rgba(0, 0, 0, 0.3)',
    200: 'rgba(0, 0, 0, 0.8)',
  },
  overlayLight: {
    50: 'rgba(255, 255, 255, 0.12)',
    100: 'rgba(255, 255, 255, 0.2)',
    200: 'rgba(232, 232, 232, 0.5)',
  },
  grey: {
    50: '#141414',
    100: '#1f1f1f',
    200: '#333333',
    300: '#545454',
    400: '#757575',
    500: '#afafaf',
    600: '#cbcbcb',
    700: '#e2e2e2',
    800: '#e8e8e8',
    900: '#f5f5f5',
  },
  red: {
    50: '#330f0a',
    100: '#5a0a00',
    200: '#870f00',
    300: '#ab1300',
    400: '#e11900',
    500: '#e85c4a',
    600: '#f1998e',
    700: '#fed7d2',
    800: '#ffefed',
  },
  orange: {
    50: '#331a12',
    100: '#672a16',
    200: '#9a3f21',
    300: '#c14f29',
    400: '#ff6937',
    500: '#ff6937',
    600: '#fabda5',
    700: '#f7dfd7',
    800: '#fff3ef',
  },
  yellow: {
    50: '#332a1a',
    100: '#674d1b',
    200: '#997328',
    300: '#bc8b2c',
    400: '#ffc043',
    500: '#ffcf70',
    600: '#ffe3ac',
    700: '#fff2d9',
    800: '#fffaf0',
  },
  green: {
    50: '#0f261c',
    100: '#10462d',
    200: '#03582f',
    300: '#03703c',
    400: '#05944f',
    500: '#06c167',
    600: '#66d19e',
    700: '#addec9',
    800: '#e6f2ed',
  },
  blue: {
    50: '#080b26',
    100: '#050c4d',
    200: '#081270',
    300: '#0a1899',
    400: '#0e1fc1',
    500: '#535fcf',
    600: '#949ce3',
    700: '#d2d7f0',
    800: '#ebedfa',
  },
  cyan: {
    50: '#0f1c33',
    100: '#dce5f5',
    200: '#174291',
    300: '#1e54b7',
    400: '#276ef1',
    500: '#1e54b7',
    600: '#a0bff8',
    700: '#d4e2fc',
    800: '#eff3fe',
  },
  purple: {
    50: '#231c33',
    100: '#2e224c',
    200: '#453473',
    300: '#574191',
    400: '#7356bf',
    500: '#957fce',
    600: '#c1b5e3',
    700: '#e3ddf2',
    800: '#f4f1fa',
  }
};

const components = {
      Alert: {
               variants: {
                  success: {
                        container: {
                              bg: "green.500",
                              color: "white", 
                        },
                  },
                  error: {
                        container: {
                              bg: "red.500",  
                              color: "white", 
                        },
                  },
                  warning: {
                        container: {
                              bg: "yellow.400",
                              color: "white",  
                        },
                  },
                  info: {
                        container: {
                              bg: "blue.400",
                              color: "white",
                        },
                  },
            }
       }
}

const theme = extendTheme({
  fonts: {
    // heading: "Inter, sans-serif",
    // body: "Inter, sans-serif",
  },
  colors: {
    ...COLORS
  },
  components: {
      ...components
  }
})

export default theme