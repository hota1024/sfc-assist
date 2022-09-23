import { NextApiRequest, NextApiResponse } from 'next'
import courses from './2022.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  if (typeof query.s === 'string') {
    const searchText = query.s
    const day = query.day as string
    const time = query.time as string
    let result = courses

    if (searchText.length > 0) {
      result = result.filter((course) => course.name.includes(searchText))
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

    return res.status(200).json(result)
  }

  res.status(200).json(courses)
}
