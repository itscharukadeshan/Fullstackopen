import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { NotificationProvider } from './state/NotificationsContext.jsx'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotificationProvider>
  </QueryClientProvider>
)
