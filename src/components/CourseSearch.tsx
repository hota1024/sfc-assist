import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { CourseCard } from './CourseCard'

const SearchInput = styled('input', {
  fontSize: '1rem',
  color: 'white',
  borderRadius: '$2',
  width: '100%',
  height: '48px',
  border: 'none',
  background: '$gray3',
  padding: '0 $3',
  '&:focus': {
    outline: '2px solid $blue',
  },
})

const CourseList = styled('div', {
  height: '600px',
  overflowY: 'scroll',
  display: 'flex',
  flexFlow: 'column',
  gap: '$3',
})

/**
 * CourseSearch props.
 */
export type CourseSearchProps = {
  day: string
  time: number
  isAddedCourse: (course: Course) => boolean
  onAddCourse: (course: Course) => void
  onDeleteCourse: (course: Course) => void
}

/**
 * CourseSearch component.
 */
export const CourseSearch: React.VFC<CourseSearchProps> = (props) => {
  const { day, time, isAddedCourse, onAddCourse, onDeleteCourse } = props
  const [searchText, setSearchText] = useState('')
  const [bouncedSearchText, setBouncedSearchText] = useState('')
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])

  const loading = !!abortController

  const fetchCourses = () => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
    }

    if (bouncedSearchText.length === 0 && allCourses.length > 0) {
      setCourses(allCourses)
      return
    }

    const query = new URLSearchParams()

    query.set('s', bouncedSearchText)
    query.set('day', day)
    query.set('time', `${time}限`)

    const controller = new AbortController()
    setAbortController(controller)

    fetch(`/api/courses?${query}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(setCourses)
      .then(() => {
        setAbortController(null)
      })
  }

  const [, cancel] = useDebounce(
    () => {
      setBouncedSearchText(searchText)
    },
    1000,
    [searchText]
  )

  useEffect(() => {
    fetchCourses()
  }, [day, time, bouncedSearchText])

  useEffect(() => {
    setSearchText('')
    setCourses([])
  }, [day, time])

  return (
    <>
      <div>
        <h2 style={{ marginBottom: '8px' }}>
          {day}曜{time}限の科目の検索
        </h2>
        <div style={{ marginBottom: '16px' }}>
          <SearchInput
            placeholder="テキストで検索"
            onChange={(e) => {
              setSearchText(e.target.value)
              cancel()
            }}
            value={searchText}
          />
        </div>
        {loading && (
          <p style={{ marginBottom: '16px', textAlign: 'center' }}>
            読み込み中...
          </p>
        )}
        <CourseList>
          {courses.map((course, key) => (
            <CourseCard
              key={key}
              course={course}
              showDetails
              showAddButton={!isAddedCourse(course)}
              showDeleteButton={isAddedCourse(course)}
              onAddClick={() => onAddCourse(course)}
              onDeleteClick={() => onDeleteCourse(course)}
            />
          ))}
        </CourseList>
      </div>
    </>
  )
}
