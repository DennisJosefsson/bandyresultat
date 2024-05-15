import { createFileRoute } from '@tanstack/react-router'
import Seasons from '../components/Season/Seasons'

export const Route = createFileRoute('/seasons')({
  component: Seasons,
})
