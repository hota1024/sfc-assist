import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'
import { CourseCard } from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog'
import { Button } from '@/pages'

const TimetableDayTh = styled('th', {
  position: 'sticky',
  zIndex: 1,
  top: 0,
})

const TimetableDay = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.2rem',
  height: '48px',
  background: '$gray3',
  width: '280px',
  '@xl': {
    borderRadius: '$2',
    width: '100%',
  },
})

const TdBase = styled('td', {})

const TimetableTimeTd = styled(TdBase, {
  position: 'sticky',
  zIndex: 1,
  left: 0,
})

const TimetableShareButtonTd = styled(TdBase, {
  position: 'sticky',
  zIndex: 2,
  top: 0,
  left: 0,
  width: '48px',
  height: '48px',
})

const TimetableShareButton = styled('button', {
  background: '$blue',
  color: '$blueText',
  width: '100%',
  height: '48px',
  padding: '$2',
  fontSize: '1.4rem',
  border: 'none',
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
  '@xl': {
    borderRadius: '$2',
  },
})

const TimetableTime = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.2rem',
  width: '48px',
  height: '200px',
  background: '$gray3',
  '@xl': {
    borderRadius: '$2',
  },
})

const TimetableCellTd = styled(TdBase, {
  width: 'calc(100% / 5)',
})

const TimetableCell = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  gap: '$3',
  background: '$gray2',
  height: '200px',
  padding: '$3',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@xl': {
    borderRadius: '$2',
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

const TimetableShareField = styled('input', {
  width: '100%',
  fontSize: '1rem',
  background: '$blueAlpha',
  border: '2px solid $blue',
  outline: 'none',
  padding: '$0 $3',
  color: 'white',
  height: '48px',
  borderRadius: '$2',
})

const TimetableTable = styled('table', {
  width: '100%',
})

const TimetableRoot = styled('div', {
  height: 'calc(100dvh - 64px + 16px)',
  paddingTop: '$4',
  overflow: 'auto',
  '@xl': {
    padding: '$4',
    overflow: 'initial',
    overflowY: 'auto',
  },
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

  const rows: JSX.Element[] = []

  for (const time of times) {
    const columns: JSX.Element[] = [
      <TimetableTimeTd key={`${time}`}>
        <TimetableTime>{time}</TimetableTime>
      </TimetableTimeTd>,
    ]

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

      columns.push(
        <TimetableCellTd key={day}>
          <TimetableCell>
            {cell}
            <TimetableCellAddButton
              key="add-button"
              onClick={() => onAddClick && onAddClick(day, time)}
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </TimetableCellAddButton>
          </TimetableCell>
        </TimetableCellTd>
      )
    }

    rows.push(<tr key={time}>{columns}</tr>)
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
          <Button
            onClick={() => setDialog(false)}
            css={{
              position: 'absolute',
              bottom: '$4',
              left: '$4',
              right: '$4',
            }}
          >
            閉じる
          </Button>
        </DialogContent>
      </Dialog>
      <TimetableRoot>
        <TimetableTable>
          <thead>
            <tr>
              <TimetableShareButtonTd>
                <TimetableShareButton
                  key={'share'}
                  onClick={() => setDialog(true)}
                >
                  <FontAwesomeIcon icon={faShare} />
                </TimetableShareButton>
              </TimetableShareButtonTd>
              {days.map((day) => (
                <TimetableDayTh key={day}>
                  <TimetableDay>{day}</TimetableDay>
                </TimetableDayTh>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </TimetableTable>
      </TimetableRoot>
    </>
  )
}
