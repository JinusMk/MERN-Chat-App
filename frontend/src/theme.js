import { extendTheme } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';

// const styles = {
//   global: props => ({
//     body: {
//       color: mode('gray.800', 'whiteAlpha.900')(props),
//       bg: mode('gray.100', '#141214')(props),
//     },
//   }),
// };

// export const lightTheme = {
//     primary: {
//         300: '#ECEDF0',
//         400: '#FDFDFF',
//     },
//     secondary: {
//         300: '#646464',
//         400: '#424242',
//     },
//     brand: {
//         300: '#7C82FB',
//         400: '#5F63FC',
//     },
// };

// export const darkTheme = {
//     primary: {
//         300: '#646464',
//         400: '#424242',
//     },
//     secondary: {
//         300: '#ECEDF0',
//         400: '#FDFDFF',
//     },
//     brand: {
//         300: '#94d3ac',
//         400: '#29c7ac',
//     },
// };
// const lightTheme = {
//     primary: COLORS.white,
//     inversePrimary: COLORS.black,
//     accent: COLORS.orange[400],
//     negative: COLORS.red[400],
//     positive: COLORS.green[400],
//     positiveLight: COLORS.green[500],
//     warning: COLORS.yellow[400],
//     background: {
//       transparent: COLORS.transparent,
//       primary: COLORS.grey[900],
//       secondary: COLORS.grey[800],
//       tertiary: COLORS.white,
//       inversePrimary: COLORS.black,
//       inverseSecondary: COLORS.grey[100],
//       inverseTertiary: COLORS.grey[200],
//       disabled: COLORS.grey[800],
//       disabledDark: COLORS.grey[700],
//       overlayDark: COLORS.overlayDark[100],
//       overlayLight: COLORS.overlayLight[50],
//       overlayLightSecondary: COLORS.overlayLight[200],
//       accent: COLORS.orange[400],
//       negative: COLORS.red[400],
//       warning: COLORS.yellow[400],
//       positive: COLORS.green[400],
//       accentLight: COLORS.orange[700],
//       negativeLight: COLORS.red[700],
//       negativeSecondary: COLORS.red[800],
//       warningLight: COLORS.yellow[700],
//       positiveLight: COLORS.green[700],
//       accentDark: COLORS.orange[300],
//       negativeDark: COLORS.red[300],
//       warningDark: COLORS.yellow[300],
//       positiveDark: COLORS.green[300],
//       primaryOverlayDark: COLORS.overlayDark[100],
//       secondaryOverlayDark: COLORS.overlayDark[50],
//     },
//     text: {
//       primary: COLORS.black,
//       primaryDisabled: COLORS.grey[700],
//       secondary: COLORS.grey[300],
//       tertiary: COLORS.grey[400],
//       inversePrimary: COLORS.white,
//       inverseSecondary: COLORS.grey[600],
//       inverseTertiary: COLORS.grey[500],
//       disabled: COLORS.grey[500],
//       positiveDark: COLORS.green[300],
//       blue: COLORS.cyan[400],
//       onBackground: COLORS.white,
//       accent: COLORS.orange[400],
//       negative: COLORS.red[400],
//       negativeLight: COLORS.orange[200],
//       negativeSecondary: COLORS.red[500],
//       positive: COLORS.yellow[400],
//       warning: COLORS.green[400],
//     },
//     border: {
//       primary: COLORS.grey[700],
//       primaryLight: COLORS.grey[800],
//       transparent: COLORS.overlayDark[50],
//       highlight: COLORS.black,
//       inversePrimary: COLORS.grey[200],
//       inverseTransparent: COLORS.overlayLight[100],
//       inverseHighlight: COLORS.white,
//       disabled: COLORS.grey[700],
//       accent: COLORS.orange[400],
//       accentSemiLight: COLORS.orange[600],
//       accentLight: COLORS.orange[700],
//       negative: COLORS.red[400],
//       negativeLight: COLORS.red[700],
//       warning: COLORS.yellow[600],
//       positive: COLORS.green[600],
//       lightDivider: COLORS.grey[900],
//       check: COLORS.grey[600],
//     },
//     tabs: {
//       inactive: COLORS.grey[500],
//       hover: COLORS.grey[700],
//     },
//     badge: {
//       tertiary: COLORS.grey[500],
//     },
//     progressBar: {
//       accepted: COLORS.cyan[400],
//       attempted: COLORS.yellow[400],
//       success: COLORS.green[500],
//       failed: COLORS.red[400],
//       primary: COLORS.orange[400],
//       darkGreen: COLORS.green[400],
//     },
//     social: {
//       google: COLORS.googleBlue,
//       facebook: COLORS.facebookBlue,
//     },
//   }

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
    500: '#fa9269',
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
      Button: {
            variants: {
                  primary : {
                        bg: "orange.400",
                        color: COLORS.white,
                         _hover: {
                              bg: "orange.300",
                        },
                        _disabled: {
                              bg: "orange.700", 
                                _hover: {
                                    bg: "orange.700 !important" ,
                              },
                        },
                  },
                  link : {
                        color: "orange.400",
                  }
            }
      },
      Alert: {
               variants: {
                  success: {
                        container: {
                              bg: "green.500", // Custom success background color
                              color: "white",  // Custom text color for success
                        },
                  },
                  error: {
                        container: {
                              bg: "red.500",   // Custom error background color
                              color: "white",  // Custom text color for error
                        },
                  },
                  warning: {
                        container: {
                              bg: "yellow.400",  // Custom warning background color
                              color: "white",    // Custom text color for warning
                        },
                  },
                  info: {
                        container: {
                              bg: "blue.400",   // Custom info background color
                              color: "white",   // Custom text color for info
                        },
                  },
            }
       }
}

const theme = extendTheme({
  colors: {
    ...COLORS
  },
  components: {
      ...components
  }
})

export default theme