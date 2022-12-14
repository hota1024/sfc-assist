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
    const includeMedia = (query.media as string) === 'true' ? true : false
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

    if (day && time) {
      result = result.filter((c) =>
        c.dates.some((d) => d.day === day && d.time === time)
      )
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

    if (!includeMedia) {
      result = result.filter(
        (course) => !course.faculty.includes('政策・メディア研究科')
      )
    }

    return res.status(200).json(result)
  }

  res.status(200).json(courses)
}
