import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { CourseCard } from './CourseCard'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from './Popover'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

const SearchContainer = styled('div', {
  display: 'grid',
  gap: '$2',
  marginBottom: '$4',
  gridTemplateColumns: '3fr 8fr 1fr',
  '@md': {
    gridTemplateColumns: '3fr 8fr 1fr',
  },
})

const SearchInput = styled('input', {
  display: 'block',
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
  overflowY: 'scroll',
  display: 'flex',
  flexFlow: 'column',
  gap: '$3',
  height: 'calc(100% - 40px - 48px - 32px)',
})

const CloseButton = styled('button', {
  position: 'relative',
  background: '$blueAlpha',
  color: '$blue',
  // width: '100%',
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
  height: '48px',
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

const SettingButton = styled('button', {
  display: 'block',
  padding: '0 $3',
  height: '48px',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  background: '$blueAlpha',
  color: '$blue',
  fontSize: '1.2rem',
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

const ActionButton = styled('button', {
  position: 'relative',
  background: '$blue',
  color: '$blueColor',
  // width: '100%',
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

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '$4',
})

const FooterContent = styled('div', {
  display: 'flex',
  gap: '$4',
})

/**
 * CourseSearch props.
 */
export type CourseSearchProps = {
  day?: string
  time?: number
  isAddedCourse: (course: Course) => boolean
  onAddCourse: (course: Course) => void
  onDeleteCourse: (course: Course) => void
  onCloseClick: () => void
  onDayTimeChange: (data: { day?: string; time?: number }) => void
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
  const contentRef = useRef<HTMLElement>()
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
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(false)

  const fetchCourses = (page = 0) => {
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
    if (day) {
      query.set('day', day)
    }
    if (time) {
      query.set('time', `${time}限`)
    }
    query.set('lab', `${includeLab}`)
    query.set('lang', `${includeLang}`)
    query.set('media', `${includeMedia}`)
    query.set('page', `${page}`)

    const controller = new AbortController()
    setAbortController(controller)

    fetch(`/api/courses?${query}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const { courses } = data
        setPage(page)
        setCourses(courses)
        setLoading(false)
        setAbortController(null)

        setTotalPages(data.totalPages)
        setHasPrev(data.hasPrev)
        setHasNext(data.hasNext)

        if (courses && courses.length === 0) {
          setNotFound(true)
        }

        contentRef.current?.scrollTo(0, 0)
      })
  }

  const onPrevClick = () => {
    fetchCourses(page - 1)
  }

  const onNextClick = () => {
    fetchCourses(page + 1)
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
    <div style={{ height: '100%' }}>
      <SearchContainer>
        <Popover
          slots={{
            trigger: (
              <SettingButton
                css={{
                  fontSize: '0.9rem',
                  '@md': {
                    fontSize: 'initial',
                  },
                }}
              >
                {!day && !time && 'すべての時間'}
                <span style={{ display: 'inline-block' }}>
                  {day ? `${day}曜` : ''}
                </span>
                <span style={{ display: 'inline-block' }}>
                  {time ? `${time}限` : ''}
                </span>
              </SettingButton>
            ),
            content: (
              <div style={{ textAlign: 'right' }}>
                <ToggleGroup
                  type="single"
                  value={day}
                  onValueChange={(day) => props.onDayTimeChange({ day, time })}
                >
                  {['月', '火', '水', '木', '金'].map((d) => (
                    <ToggleGroupItem key={d} value={d}>
                      {d}曜
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <div style={{ margin: '16px 0' }}></div>
                <ToggleGroup
                  type="single"
                  value={time ? time.toString() : undefined}
                  onValueChange={(v) =>
                    props.onDayTimeChange({ day, time: parseInt(v) })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                    <ToggleGroupItem key={t} value={t.toString()}>
                      {t}限
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            ),
          }}
        />
        <SearchInput
          placeholder="科目名、教員名、分野名などで検索"
          onChange={(e) => {
            setSearchText(e.target.value)
            cancel()
          }}
          value={searchText}
        />
        <Popover
          slots={{
            trigger: (
              <SettingButton>
                <FontAwesomeIcon icon={faGear} />
              </SettingButton>
            ),
            content: (
              <div style={{ display: 'flex', flexFlow: 'column', gap: 16 }}>
                <ToggleButton
                  value={includeMedia}
                  onClick={() => setIncludeMedia((v) => !v)}
                >
                  政メ {includeMedia ? 'ON' : 'OFF'}
                </ToggleButton>
                <ToggleButton
                  value={includeLab}
                  onClick={() => setIncludeLab((v) => !v)}
                >
                  研究 {includeLab ? 'ON' : 'OFF'}
                </ToggleButton>
                <ToggleButton
                  value={includeLang}
                  onClick={() => setIncludeLang((v) => !v)}
                >
                  言語 {includeLang ? 'ON' : 'OFF'}
                </ToggleButton>
              </div>
            ),
          }}
        />
      </SearchContainer>
      <CourseList ref={contentRef as any} css={{ position: 'relative' }}>
        {loading && (
          <>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 998,
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              読み込み中...
            </div>
          </>
        )}
        {searchText !== '' && notFound && (
          <NotFoundAlert>該当する科目が見つかりませんでした。</NotFoundAlert>
        )}
        {courses &&
          courses.map((course, key) => (
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
      <Footer>
        <FooterContent>
          <CloseButton
            onClick={() => {
              setLoading(false)
              setNotFound(false)
              onCloseClick()
            }}
          >
            閉じる
          </CloseButton>
        </FooterContent>

        <FooterContent>
          <ActionButton onClick={onPrevClick} disabled={!hasPrev || loading}>
            前へ
          </ActionButton>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            {page + 1} / {totalPages}
          </div>
          <ActionButton onClick={onNextClick} disabled={!hasNext || loading}>
            次へ
          </ActionButton>
        </FooterContent>
      </Footer>
    </div>
  )
}
