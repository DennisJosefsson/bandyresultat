import { createFileRoute } from '@tanstack/react-router'
import Maraton from '../components/Maraton/Maraton'
import { z } from 'zod'

const maratonSearchSchema = z.object({
  tab: z.enum(['maraton', 'records', 'help']).catch('maraton'),
  table: z.enum(['all', 'home', 'away']).catch('all').optional(),
  record: z
    .enum(['generalStats', 'points', 'scored', 'conceded', 'streaks'])
    .optional(),
})

//type MaratonSearch = z.infer<typeof maratonSearchSchema>

export const Route = createFileRoute('/maraton')({
  component: Maraton,
  validateSearch: maratonSearchSchema,
})
