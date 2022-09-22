import { Container } from '@/components/Container'
import { SeasonTitle } from '@/components/SeasonTitle'
import { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import { CourseCard } from '@/components/CourseCard'
import { Course } from '@/types/Course'
import { Timetable } from '@/components/Timetable'

const fetcher = () =>
  fetch('/api/courses').then((res) => res.json() as unknown as Course[])

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const { data, error } = useSWR('/api/courses', fetcher)

  return (
    <>
      <Head>
        <title>home - sfc-assist</title>
      </Head>
      <Container>
        <SeasonTitle>2022年度 秋学期</SeasonTitle>
        <div style={{ margin: '16px 0' }}></div>
        {data && <Timetable courses={[]} />}
        {/* <div style={{ width: 300 }}>
          {data && (
            <CourseCard
              course={data.reduce(
                (c, v) => (v.field.length > c.field.length ? v : c),
                data[0]
              )}
            />
          )}
        </div> */}
      </Container>
    </>
  )
}

export default HomePage
