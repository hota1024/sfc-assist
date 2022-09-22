import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'

const CourseCardRoot = styled('div', {
  borderRadius: '$2',
  background: '$gray3',
  padding: '$2 $3',
})

const CourseCardHeader = styled('div', {
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const CourseCardName = styled('h3', {
  margin: 0,
  fontSize: '1.2rem',
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

/**
 * CourseCard props.
 */
export type CourseCardProps = {
  course: Course
}

/**
 * CourseCard component.
 */
export const CourseCard: React.VFC<CourseCardProps> = (props) => {
  const { course } = props

  return (
    <CourseCardRoot>
      <CourseCardHeader>
        <CourseCardName>{course.name}</CourseCardName>
        {course.syllabusPath && (
          <CourseCardSyllabusLink
            href={`https://syllabus.sfc.keio.ac.jp/${course.syllabusPath}`}
            target="_blank"
          >
            SFC
          </CourseCardSyllabusLink>
        )}
      </CourseCardHeader>
      <CourseCardTeacherList>
        {course.teacherNames.join(', ')}
      </CourseCardTeacherList>
      <CourseCardFieldList>
        {course.field.split('-').map((field) => (
          <CourseCardField key={field}>{field}</CourseCardField>
        ))}
      </CourseCardFieldList>
    </CourseCardRoot>
  )
}
