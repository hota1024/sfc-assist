import { NextApiRequest, NextApiResponse } from 'next'
import courses from './2023f.json'

function arrayChunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [[]]
  const result = []
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  if (typeof query.s === 'string') {
    const searchText = query.s
    const page = parseInt((query.page as string | null) ?? '0')
    const day = query.day as string
    const time = query.time as string
    const includeLab = (query.lab as string) === 'true' ? true : false
    const includeLang = (query.lang as string) === 'true' ? true : false
    const includeMedia = (query.media as string) === 'true' ? true : false
    let filteredCourses = courses

    filteredCourses = filteredCourses.filter(
      (course) => course.semester === '秋学期'
    )

    if (searchText.length > 0) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.name.includes(searchText) ||
          course.teacherNames.some((teacherName) =>
            teacherName.includes(searchText)
          ) ||
          course.field.includes(searchText)
      )
    }

    if (day && time) {
      filteredCourses = filteredCourses.filter((c) =>
        c.dates.some((d) => d.day === day && d.time === time)
      )
    }

    if (!includeLab) {
      filteredCourses = filteredCourses.filter(
        (course) => !course.field.includes('研究プロジェクト')
      )
    }

    if (!includeLang) {
      filteredCourses = filteredCourses.filter(
        (course) => !course.field.includes('言語コミュニケーション')
      )
    }

    if (!includeMedia) {
      filteredCourses = filteredCourses.filter(
        (course) => !course.faculty.includes('政策・メディア研究科')
      )
    }

    const chunked = arrayChunk(filteredCourses, 50)

    return res.status(200).json({
      courses: chunked[page],
      totalPages: chunked.length,
      hasNext: page < chunked.length - 1,
      hasPrev: page > 0,
    })
  }

  res.status(200).json(courses)
}
