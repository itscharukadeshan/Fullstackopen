import React, { createContext, useReducer, useEffect } from 'react'
import { toast } from 'react-toastify'

const initialState = {
  notifications: [],
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  useEffect(() => {
    if (state.notifications.length > 0) {
      const latestNotification =
        state.notifications[state.notifications.length - 1]
      toast[latestNotification.type](latestNotification.message, {
        autoClose: 3000,
      })

      const timeoutId = setTimeout(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          payload: latestNotification.id,
        })
      }, 3000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [state.notifications])

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}
