import { NextApiRequest, NextApiResponse } from 'next'
import courses from './2022.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  if (typeof query.s === 'string') {
    const searchText = query.s
    const day = query.day as string
    const time = query.time as string
    const includeLab = (query.lab as string) === 'true' ? true : false
    const includeLang = (query.lang as string) === 'true' ? true : false
    let result = courses

    result = result.filter((course) => course.semester !== '春学期')

    if (searchText.length > 0) {
      result = result.filter(
        (course) =>
          course.name.includes(searchText) ||
          course.teacherNames.some((teacherName) =>
            teacherName.includes(searchText)
          ) ||
          course.field.includes(searchText)
      )
    }

    if (day) {
      result = result.filter((course) => {
        return course.dates.some((date) => date.day === day)
      })
    }

    if (time) {
      result = result.filter((course) => {
        return course.dates.some((date) => date.time === time)
      })
    }

    if (!includeLab) {
      result = result.filter(
        (course) => !course.field.includes('研究プロジェクト')
      )
    }

    if (!includeLang) {
      result = result.filter(
        (course) => !course.field.includes('言語コミュニケーション')
      )
    }

    return res.status(200).json(result)
  }

  res.status(200).json(courses)
}
