import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { CourseCard } from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog'

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

const TimetableShareButton = styled('button', {
  background: '$blue',
  color: '$blueText',
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

const TimetableShareField = styled('input', {
  width: '100%',
  fontSize: '1rem',
  background: '$blueAlpha',
  border: '2px solid $blue',
  borderRadius: '$2',
  outline: 'none',
  padding: '$0 $3',
  color: '$blueColor',
  height: '48px',
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
  onAddClick?: (day: string, time: number) => void
  onCourseDelete?: (course: Course) => void
  hideActions?: boolean
}

/**
 * Timetable component.
 */
export const Timetable: React.VFC<TimetableProps> = (props) => {
  const { courses, onAddClick, onCourseDelete, hideActions } = props
  const days = ['月', '火', '水', '木', '金']
  const times = [1, 2, 3, 4, 5, 6, 7]
  const [dialog, setDialog] = useState(false)
  const shareLink = `${
    typeof window === 'undefined' ? '' : window.location.origin
  }/view?q=${courses
    .map((v) => v.number)
    .map((v) => parseInt(v, 10).toString(36))
    .join('.')}`

  const contents: JSX.Element[] = [
    <TimetableShareButton key={'share'} onClick={() => setDialog(true)}>
      <FontAwesomeIcon icon={faShare} />
    </TimetableShareButton>,
  ]

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
            showControlIconsOnHover={!hideActions}
            shareHover
            onDeleteClick={() => onCourseDelete && onCourseDelete(c)}
          />
        ))
      if (!hideActions) {
        cell.push(
          <TimetableCellAddButton
            key="add-button"
            onClick={() => onAddClick && onAddClick(day, time)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </TimetableCellAddButton>
        )
      }
      contents.push(
        <TimetableCell key={`${time}-${day}`}>{cell}</TimetableCell>
      )
    }
  }

  return (
    <>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogHeader>
          <DialogTitle>時間割の共有</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <TimetableShareField
            readOnly
            value={shareLink}
            onClick={(e) => e.currentTarget.select()}
          />
        </DialogContent>
      </Dialog>
      <TimetableRoot>{contents}</TimetableRoot>
    </>
  )
}
