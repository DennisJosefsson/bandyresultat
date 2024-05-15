import { createFileRoute } from '@tanstack/react-router'
import Compare from '../components/Compare/Compare'
import { compareFormState } from '../components/types/teams/teams'

export const Route = createFileRoute('/teams/compare')({
  component: Compare,
  validateSearch: compareFormState,
})
