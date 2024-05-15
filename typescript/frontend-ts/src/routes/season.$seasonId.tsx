import { createFileRoute } from '@tanstack/react-router'
import Season from '../components/Season/Season'
import { z } from 'zod'

const seasonsSearchType = z.object({
  tab: z
    .enum([
      'games',
      'tables',
      'playoff',
      'roundForRound',
      'stats',
      'map',
      'help',
    ])
    .catch('tables'),
})

export const Route = createFileRoute('/season/$seasonId')({
  component: Season,
  validateSearch: seasonsSearchType,
})
