import { Container } from '@/components/Container'
import { SeasonTitle } from '@/components/SeasonTitle'
import { NextPage } from 'next'
import Head from 'next/head'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - sfc-assist</title>
      </Head>
      <Container>
        <SeasonTitle>2022年度 秋学期</SeasonTitle>
      </Container>
    </>
  )
}

export default HomePage
