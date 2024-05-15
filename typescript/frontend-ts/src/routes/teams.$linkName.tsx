import { createFileRoute } from '@tanstack/react-router'
import Teams from '../components/Team/Teams'

export const Route = createFileRoute('/teams/$linkName')({
  component: Teams,
})
