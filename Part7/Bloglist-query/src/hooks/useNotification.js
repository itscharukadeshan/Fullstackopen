import { useContext } from 'react'
import { NotificationContext } from '../state/NotificationsContext.jsx'

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }

  const { state, dispatch } = context

  const addNotification = (message, type) => {
    const notification = {
      id: Date.now(),
      message,
      type,
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
  }
}
