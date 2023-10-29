import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import GenderContextProvider from './contexts/genderContext'
import UserContextProvider from './contexts/userContext'
import FavTeamsContextProvider from './contexts/favteamsContext'
import MenuContextProvider from './contexts/menuContext'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

console.log('BK allez allez.')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GenderContextProvider>
          <FavTeamsContextProvider>
            <MenuContextProvider>
              <App />
            </MenuContextProvider>
          </FavTeamsContextProvider>
        </GenderContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
)
