import { createStitches } from '@stitches/react'

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
  keyframes,
} = createStitches({
  theme: {
    colors: {
      backgroundColor: '#101010',
      textColor: 'white',
      yellow: '#FDD000',
      yellowColor: 'rgba(0, 0, 0, 0.8)',
      blue: '#5865F2',
      blueDark: '#444DAD',
      blueBlack: '#272D6A',
      blueColor: 'white',
      blueAlpha: 'rgba(88, 101, 242, 0.1)',
      grayText: '#a0a0a0',
      gray1: '#303030',
      gray2: '#181818',
      gray3: '#1F1F1F',
    },
    fonts: {
      body: 'Noto Sans JP, sans-serif',
    },
    space: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
    },
    radii: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
    },
  },
})
