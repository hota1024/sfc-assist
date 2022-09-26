import { Course } from '@/types/Course'

export const fetchCourses = () =>
  fetch('/api/courses').then((res) => res.json() as unknown as Course[])
