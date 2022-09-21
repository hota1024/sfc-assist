import { globalCss } from '@/stitches.config'
import type { AppProps } from 'next/app'

const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: '$body',
    background: '$backgroundColor',
    color: '$textColor',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
