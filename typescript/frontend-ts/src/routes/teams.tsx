import { createFileRoute } from '@tanstack/react-router'
import Teams from '../components/Team/Teams'
import { z } from 'zod'

const teamIdSearch = z.object({
  teamId: z.number().int().min(1).optional(),
  link: z.string().optional(),
})

export const Route = createFileRoute('/teams')({
  component: Teams,
  validateSearch: teamIdSearch,
})
