import { createFileRoute } from '@tanstack/react-router'
import Search from '../components/Search/Search'
import { z } from 'zod'

const searchParamsType = z.object({ link: z.string().optional() })

export const Route = createFileRoute('/search')({
  component: Search,
  validateSearch: searchParamsType,
})
