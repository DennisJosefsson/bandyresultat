import { createLazyFileRoute } from '@tanstack/react-router'
import Home from '../components/Home'

export const Route = createLazyFileRoute('/')({
  component: Home,
})
