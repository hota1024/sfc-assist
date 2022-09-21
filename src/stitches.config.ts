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
      blueColor: 'white',
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
    },
  },
})
