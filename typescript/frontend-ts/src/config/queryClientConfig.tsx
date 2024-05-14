import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const MAX_RETRIES = 3
const REJECT_STATUS_CODE = [400, 401, 402, 403, 404]

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //gcTime: 1000 * 5,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (failureCount > MAX_RETRIES) return false
        if (isAxiosError(error) && error.response) {
          if (REJECT_STATUS_CODE.includes(error.response?.status)) return false
        }

        return true
      },
    },
  },
})
