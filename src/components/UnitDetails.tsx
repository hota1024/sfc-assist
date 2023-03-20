import { styled } from '@/stitches.config'
import { Course } from '@/types/Course'

const DetailsContainer = styled('div', {})

const Content = styled('div', {
  padding: '$6 0',
})

const TableWrap = styled('div', {
  // border: '$blue 1px solid',
})

const Table = styled('table', {
  width: '100%',
  maxWidth: '400px',
  borderRadius: '$2',
  borderCollapse: 'collapse',
})

const TableBody = styled('tbody', {})

const TableRow = styled('tr', {})

const TableData = styled('td', {
  padding: '$2 $4',
  border: '$blue 1px solid',
})

/**
 * UnitDetails props.
 */
export type UnitDetailsProps = {
  courses: Course[]
}

/**
 * UnitDetails component.
 */
export const UnitDetails: React.VFC<UnitDetailsProps> = (props) => {
  const { courses } = props

  const sumUnits = (courses: Course[]) =>
    courses.reduce((acc, cur) => acc + cur.units, 0)
  const filterByField = (courses: Course[], field: string) =>
    courses.filter((course) => course.field.includes(field))

  const totalUnits = sumUnits(courses)
  const langUnits = sumUnits(
    filterByField(courses, '言語コミュニケーション科目')
  )
  const ds1Units = sumUnits(filterByField(courses, 'データサイエンス１'))
  const ds2Units = sumUnits(filterByField(courses, 'データサイエンス２'))
  const advancedUnits = sumUnits(filterByField(courses, '先端科目'))

  return (
    <DetailsContainer>
      <h1>単位詳細</h1>
      <Content>
        <TableWrap>
          <Table>
            <TableBody>
              <TableRow>
                <TableData>全体</TableData>
                <TableData css={{ textAlign: 'right' }}>{totalUnits}</TableData>
              </TableRow>
              <TableRow>
                <TableData>言語コミュニケーション</TableData>
                <TableData css={{ textAlign: 'right' }}>{langUnits}</TableData>
              </TableRow>
              <TableRow>
                <TableData>データサイエンス1</TableData>
                <TableData css={{ textAlign: 'right' }}>{ds1Units}</TableData>
              </TableRow>
              <TableRow>
                <TableData>データサイエンス2</TableData>
                <TableData css={{ textAlign: 'right' }}>{ds2Units}</TableData>
              </TableRow>
              <TableRow>
                <TableData>先端科目</TableData>
                <TableData css={{ textAlign: 'right' }}>
                  {advancedUnits}
                </TableData>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrap>
      </Content>
    </DetailsContainer>
  )
}
