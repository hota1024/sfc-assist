import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { CourseCard } from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const TimetableDay = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.2rem',
  height: '48px',
  borderRadius: '$2',
  width: '100%',
  background: '$gray3',
})

const TimetableTime = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.2rem',
  width: '48px',
  borderRadius: '$2',
  height: '100%',
  background: '$gray3',
})

const TimetableCell = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  gap: '$3',
  background: '$gray2',
  borderRadius: '$2',
  height: '200px',
  padding: '$3',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

const TimetableCellAddButton = styled('button', {
  background: '$blueAlpha',
  color: '$blue',
  width: '100%',
  padding: '$2',
  fontSize: '1.4rem',
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

const TimetableRoot = styled('div', {
  display: 'grid',
  gridTemplateColumns: '48px 1fr 1fr 1fr 1fr 1fr',
  gap: '$3',
})

/**
 * Timetable props.
 */
export type TimetableProps = {
  courses: Course[]
  onAddClick: (day: string, time: number) => void
  onCourseDelete: (course: Course) => void
}

/**
 * Timetable component.
 */
export const Timetable: React.VFC<TimetableProps> = (props) => {
  const { courses, onAddClick, onCourseDelete } = props
  const days = ['月', '火', '水', '木', '金']
  const times = [1, 2, 3, 4, 5, 6, 7]

  const contents: JSX.Element[] = [<div key="first"></div>]

  for (const day of days) {
    contents.push(<TimetableDay key={day}>{day}</TimetableDay>)
  }

  for (const time of times) {
    contents.push(<TimetableTime key={time}>{time}</TimetableTime>)

    for (const day of days) {
      const cell = courses
        .filter((c) =>
          c.dates.find((d) => d.day === day && d.time === time + '限')
        )
        .map((c) => (
          <CourseCard
            key={c.name}
            course={c}
            showControlIconsOnHover
            shareHover
            onDeleteClick={() => onCourseDelete(c)}
          />
        ))
      cell.push(
        <TimetableCellAddButton
          key="add-button"
          onClick={() => onAddClick(day, time)}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </TimetableCellAddButton>
      )
      contents.push(
        <TimetableCell key={`${time}-${day}`}>{cell}</TimetableCell>
      )
    }
  }

  return (
    <>
      <TimetableRoot>{contents}</TimetableRoot>
    </>
  )
}
