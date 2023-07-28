import React, { createContext, useReducer, useEffect } from 'react'

const initialState = {
  user: null,
  token: '',
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.userData,
        token: `Bearer ${action.payload.userData.token}`,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      dispatch({ type: 'LOGIN', payload: { userData } })
    }
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
