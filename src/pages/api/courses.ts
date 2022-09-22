import { NextApiRequest, NextApiResponse } from 'next'
import courses from './2022.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(courses)
}
