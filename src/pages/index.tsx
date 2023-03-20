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
import {
  AppBar,
  AppBarActions,
  AppBarContent,
  AppBarSubTitle,
  AppBarTitle,
} from '@/components/AppBar'
import Image from 'next/image'
import { styled } from '@/stitches.config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { UnitDetails } from '@/components/UnitDetails'

const Button = styled('button', {
  position: 'relative',
  background: '$blueAlpha',
  color: '$blue',
  padding: '$2 $4',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '$2',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all 120ms ease-in-out',
  '&:hover': {
    background: '$blueDark',
    color: '$blueColor',
  },
  '&:active': {
    background: '$blueBlack',
    color: '$blueColor',
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.2,
  },
})

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const { data, error } = useSWR('/api/courses', fetchCourses)
  const [dialog, setDialog] = useState(false)
  const [unitDialog, setUnitDialog] = useState(false)
  const [date, setDate] = useState<{ day?: string; time?: number }>()
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
              onDayTimeChange={({ day, time }) => setDate({ day, time })}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={unitDialog} onClose={() => setUnitDialog(false)}>
        <DialogContent>
          <UnitDetails courses={courses} />
        </DialogContent>
      </Dialog>

      <Container>
        <AppBar>
          <AppBarContent>
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="sfc-assist-logo"
            />
            <AppBarTitle>SFC Assist</AppBarTitle>
            <AppBarSubTitle>2023年度 / 春学期</AppBarSubTitle>
          </AppBarContent>
          <AppBarActions>
            <Button
              css={{ color: 'white' }}
              onClick={() => setUnitDialog(true)}
            >
              {courses.reduce((u, c) => u + c.units, 0)}単位
            </Button>
            <Button
              onClick={() => {
                setDate({ day: undefined, time: undefined })
                setDialog(true)
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
          </AppBarActions>
        </AppBar>

        <div style={{ margin: '48px 0' }}></div>
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
