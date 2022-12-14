import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { CourseCard } from './CourseCard'

const SearchContainer = styled('div', {
  display: 'flex',
  gap: '$2',
  marginBottom: '$4',
})

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

const CloseButton = styled('button', {
  marginTop: '$4',
  background: '$blueAlpha',
  color: '$blue',
  width: '100%',
  padding: '$2',
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
})

const NotFoundAlert = styled('div', {
  background: '$redAlpha',
  border: '2px solid $redDark',
  borderRadius: '$2',
  padding: '$4',
  marginBottom: '$4',
})

const ToggleButton = styled('button', {
  color: '$blueColor',
  width: '190px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '$2',
  cursor: 'pointer',
  transition: 'all 120ms ease-in-out',
  variants: {
    value: {
      true: {
        background: '$blue',
      },
      false: {
        background: '$blueAlpha',
      },
    },
  },
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
  onCloseClick: () => void
}

/**
 * CourseSearch component.
 */
export const CourseSearch: React.VFC<CourseSearchProps> = (props) => {
  const {
    day,
    time,
    isAddedCourse,
    onAddCourse,
    onDeleteCourse,
    onCloseClick,
  } = props
  const [searchText, setSearchText] = useState('')
  const [bouncedSearchText, setBouncedSearchText] = useState('')
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [includeLab, setIncludeLab] = useState(false)
  const [includeLang, setIncludeLang] = useState(true)
  const [includeMedia, setIncludeMedia] = useState(false)

  const fetchCourses = () => {
    setNotFound(false)
    setLoading(true)

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
    query.set('time', `${time}???`)
    query.set('lab', `${includeLab}`)
    query.set('lang', `${includeLang}`)
    query.set('media', `${includeMedia}`)

    const controller = new AbortController()
    setAbortController(controller)

    fetch(`/api/courses?${query}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((courses) => {
        setCourses(courses)
        setLoading(false)
        setAbortController(null)

        if (courses.length === 0) {
          setNotFound(true)
        }
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
    setNotFound(false)
    setLoading(true)
  }, [searchText])

  useEffect(() => {
    fetchCourses()
  }, [day, time, bouncedSearchText, includeLab, includeLang, includeMedia])

  useEffect(() => {
    setNotFound(false)
    setLoading(true)
    setSearchText('')
    setCourses([])
  }, [day, time])

  return (
    <>
      <div>
        <h2 style={{ marginBottom: '8px' }}>
          {day}???{time}?????????????????????
        </h2>
        <SearchContainer>
          <SearchInput
            placeholder="????????????????????????????????????????????????"
            onChange={(e) => {
              setSearchText(e.target.value)
              cancel()
            }}
            value={searchText}
          />
          <ToggleButton
            value={includeMedia}
            onClick={() => setIncludeMedia((v) => !v)}
          >
            ?????? {includeMedia ? 'ON' : 'OFF'}
          </ToggleButton>
          <ToggleButton
            value={includeLab}
            onClick={() => setIncludeLab((v) => !v)}
          >
            ?????? {includeLab ? 'ON' : 'OFF'}
          </ToggleButton>
          <ToggleButton
            value={includeLang}
            onClick={() => setIncludeLang((v) => !v)}
          >
            ?????? {includeLang ? 'ON' : 'OFF'}
          </ToggleButton>
        </SearchContainer>
        {loading && (
          <p style={{ marginBottom: '16px', textAlign: 'center' }}>
            ???????????????...
          </p>
        )}
        <CourseList>
          {searchText !== '' && notFound && (
            <NotFoundAlert>??????????????????????????????????????????????????????</NotFoundAlert>
          )}
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
        <CloseButton
          onClick={() => {
            setLoading(false)
            setNotFound(false)
            onCloseClick()
          }}
        >
          ?????????
        </CloseButton>
      </div>
    </>
  )
}
