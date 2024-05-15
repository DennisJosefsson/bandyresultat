import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/Dashboard/Dashboard'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: Dashboard,
})
