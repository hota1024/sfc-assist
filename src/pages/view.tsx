import { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchCourses } from '@/fetchers/courses'
import { Timetable } from '@/components/Timetable'
import { Course } from '@/types/Course'
import { Container } from '@/components/Container'

/**
 * View page.
 */
export const ViewPage: NextPage = () => {
  const router = useRouter()
  const { data, error } = useSWR('/api/courses', fetchCourses)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!data) {
      return
    }

    const q = router.query.q

    if (typeof q !== 'string') {
      return
    }

    const numbers = q
      .split('.')
      .map((v) => parseInt(v, 36).toString().padStart(5, '0'))

    setCourses(data.filter((c) => numbers.includes(c.number)))
  }, [router, data])

  return (
    <>
      <Container>
        <Timetable courses={courses} hideActions />
      </Container>
    </>
  )
}

export default ViewPage
