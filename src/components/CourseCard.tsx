import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { atom, useAtom } from 'jotai'

const hoveredNumberAtom = atom<string | null>(null)

const CourseCardAddButton = styled('button', {
  width: '48px',
  height: '48px',
  border: 'none',
  outline: 'none',
  borderRadius: '999px',
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

const CourseCardDeleteButton = styled('button', {
  width: '48px',
  height: '48px',
  border: 'none',
  outline: 'none',
  borderRadius: '999px',
  background: '$redAlpha',
  color: '$red',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'all 120ms ease-in-out',
  '&:hover': {
    background: '$redDark',
    color: '$redColor',
  },
  '&:active': {
    background: '$redBlack',
    color: '$redColor',
  },
})

const CourseCardDeleteIcon = styled('button', {
  position: 'absolute',
  right: -4,
  top: -4,
  width: '32px',
  height: '32px',
  border: 'none',
  borderRadius: '$2',
  background: '$redDark',
  color: '$redColor',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 120ms ease-in-out',
  outline: '2px solid $red',
  '&:hover': {
    background: '$redDark',
    color: '$redColor',
  },
  '&:active': {
    background: '$redBlack',
    color: '$redColor',
  },
})

const CourseCardRoot = styled('div', {
  position: 'relative',
  borderRadius: '$2',
  background: '$gray3',
  padding: '$2 $3',
  transition: 'all 200ms ease-in-out',
  variants: {
    hovered: {
      true: {
        outline: '2px solid $blue',
      },
      false: {
        outline: '2px solid transparent',
      },
    },
  },
  [`& > ${CourseCardDeleteIcon}`]: {
    opacity: 0,
  },
  [`&:hover > ${CourseCardDeleteIcon}`]: {
    opacity: 1,
  },
})

const CourseCardHeader = styled('div', {
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const CourseCardName = styled('a', {
  color: 'white',
  margin: 0,
  fontSize: '1.2rem',
  textDecoration: 'none',
  fontWeight: 600,
})

const CourseCardSyllabusLink = styled('a', {
  width: '48px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  color: '$grayText',
  textDecoration: 'none',
  borderRadius: '$1',
  transition: 'all 120ms ease-in-out',
  '&:hover': {
    background: '$yellow',
    color: '$yellowColor',
  },
})

const CourseCardTeacherList = styled('div', {
  display: 'flex',
  fontSize: '0.95rem',
  color: '$grayText',
  fontWeight: 600,
  marginBottom: '$2',
})

const CourseCardDetails = styled('div', {
  display: 'flex',
  fontSize: '0.95rem',
  color: '$grayText',
  fontWeight: 600,
  marginBottom: '$2',
  flexFlow: 'column',
  gap: '$4',
})

const CourseCardDetailRow = styled('div', {
  display: 'flex',
  gap: '$2',
})

const CourseCardDate = styled('div', {
  borderRadius: '$2',
  background: '$yellow',
  color: '$yellowColor',
  fontSize: '0.8rem',
  padding: '$1 $2',
})

const CourseCardUnit = styled('span', {
  borderRadius: '$2',
  background: '$blue',
  color: '$blueColor',
  fontSize: '0.8rem',
  padding: '$1 $4',
})

const CourseCardFieldList = styled('div', {
  overflow: 'scroll',
  marginBottom: '$1',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

const CourseCardField = styled('span', {
  display: 'inline-block',
  fontSize: '0.8rem',
  padding: '0 $2',
  borderRadius: '$1',
  background: '$blue',
  color: '$blueColor',
  margin: '0 $1 $1 0',
  '&:first-child': {
    marginLeft: 0,
  },
  '&:last-child': {
    marginRight: 0,
  },
})

const CourseCardContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

/**
 * CourseCard props.
 */
export type CourseCardProps = {
  course: Course
  showDetails?: boolean
  showAddButton?: boolean
  onAddClick?: () => void
  showDeleteButton?: boolean
  onDeleteClick?: () => void
  showDeleteIconOnHover?: boolean
  shareHover?: boolean
}

/**
 * CourseCard component.
 */
export const CourseCard: React.VFC<CourseCardProps> = (props) => {
  const {
    course,
    showDetails,
    showAddButton,
    onAddClick: onAddButtonClick,
    showDeleteButton,
    onDeleteClick,
    showDeleteIconOnHover,
    shareHover,
  } = props
  const [hoveredNumber, setHoveredNumber] = useAtom(hoveredNumberAtom)

  return (
    <CourseCardRoot
      onMouseOver={() => setHoveredNumber(course.number)}
      onMouseLeave={() => setHoveredNumber(null)}
      hovered={shareHover && hoveredNumber === course.number}
    >
      {showDeleteIconOnHover && (
        <CourseCardDeleteIcon onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </CourseCardDeleteIcon>
      )}
      <CourseCardContent>
        <div>
          <CourseCardHeader>
            <CourseCardName
              href={`https://syllabus.sfc.keio.ac.jp/${course.syllabusPath}`}
              target="_blank"
            >
              {course.name}
            </CourseCardName>
          </CourseCardHeader>
          <CourseCardTeacherList>
            {course.teacherNames.join(', ')}
          </CourseCardTeacherList>
          {showDetails && (
            <CourseCardDetails>
              <CourseCardDetailRow>
                <CourseCardUnit>{course.units}単位</CourseCardUnit>
                {course.dates.map((v, key) => (
                  <CourseCardDate key={key}>
                    {v.day}曜{v.time}限
                  </CourseCardDate>
                ))}
              </CourseCardDetailRow>
            </CourseCardDetails>
          )}
          <CourseCardFieldList>
            {course.field.split('-').map((field) => (
              <CourseCardField key={field}>{field}</CourseCardField>
            ))}
          </CourseCardFieldList>
        </div>
        <div>
          {showAddButton && (
            <CourseCardAddButton onClick={onAddButtonClick}>
              <FontAwesomeIcon icon={faPlus} />
            </CourseCardAddButton>
          )}
          {showDeleteButton && (
            <CourseCardDeleteButton onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </CourseCardDeleteButton>
          )}
        </div>
      </CourseCardContent>
    </CourseCardRoot>
  )
}
