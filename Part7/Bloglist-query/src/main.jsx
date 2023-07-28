import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { NotificationProvider } from './state/NotificationsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NotificationProvider>
)
