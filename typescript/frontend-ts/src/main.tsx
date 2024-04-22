import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import GenderContextProvider from './contexts/genderContext.js'
import UserContextProvider from './contexts/userContext.js'
import FavTeamsContextProvider from './contexts/favteamsContext.js'
import MenuContextProvider from './contexts/menuContext.js'
import { ThemeProvider } from './hooks/contextHooks/useTheme.js'
import './index.css'
import App from './App.js'
import { queryClient } from './config/queryClientConfig.js'

console.log('BK allez allez.')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GenderContextProvider>
          <FavTeamsContextProvider>
            <MenuContextProvider>
              <ThemeProvider defaultTheme="light" storageKey="theme">
                <App />
              </ThemeProvider>
            </MenuContextProvider>
          </FavTeamsContextProvider>
        </GenderContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
)
