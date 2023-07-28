import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { NotificationProvider } from './state/NotificationsContext.jsx'
import { UserProvider } from './state/UserProvider.jsx'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <NotificationProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </NotificationProvider>
    </UserProvider>
  </QueryClientProvider>
)
