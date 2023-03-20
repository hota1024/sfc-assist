import { Container } from '@/components/Container'
import { SeasonTitle } from '@/components/SeasonTitle'
import { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import { CourseCard } from '@/components/CourseCard'
import { Course } from '@/types/Course'
import { Timetable } from '@/components/Timetable'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { CourseSearch } from '@/components/CourseSearch'
import { TotalUnit } from '@/components/TotalUnit'
import { fetchCourses } from '@/fetchers/courses'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const { data, error } = useSWR('/api/courses', fetchCourses)
  const [dialog, setDialog] = useState(false)
  const [date, setDate] = useState<{ day: string; time: number }>()
  const [courses, setCourses] = useState<Course[]>([])
  const [loadedData, setLoadedData] = useState(false)

  const deleteCourse = (course: Course) => {
    setCourses((v) =>
      v.filter((c) => !(c.id === course.id && c.name === course.name))
    )
  }

  useEffect(() => {
    if (!loadedData) {
      return
    }

    localStorage.setItem(
      'courseNumbers',
      JSON.stringify(courses.map((c) => c.number))
    )
  }, [courses])

  useEffect(() => {
    const courseNumbers = JSON.parse(
      localStorage.getItem('courseNumbers') || '[]'
    ) as string[]

    if (data && !loadedData) {
      let courses = data.filter((c) => courseNumbers.includes(c.number))
      courses = courses.reduce(
        (v, c) => (v.some((a) => a.number === c.number) ? v : [...v, c]),
        [] as Course[]
      )

      setCourses(courses)
      setLoadedData(true)
    }
  }, [data])

  return (
    <>
      <Head>
        <title>ホーム - sfc-assist</title>
      </Head>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogContent>
          {date && (
            <CourseSearch
              day={date.day}
              time={date.time}
              isAddedCourse={(course) =>
                courses.some(
                  (c) => c.id === course.id && c.name === course.name
                )
              }
              onAddCourse={(course) => setCourses((v) => [...v, course])}
              onDeleteCourse={deleteCourse}
              onCloseClick={() => setDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Container>
        <SeasonTitle>
          2023年度 春学期
          <TotalUnit>
            合計単位数: {courses.reduce((u, c) => u + c.units, 0)}
          </TotalUnit>
        </SeasonTitle>

        <div style={{ margin: '16px 0' }}></div>
        {data && (
          <Timetable
            courses={courses}
            onAddClick={(day, time) => {
              setDate({ day, time })
              setDialog(true)
            }}
            onCourseDelete={deleteCourse}
          />
        )}
      </Container>
    </>
  )
}

export default HomePage
