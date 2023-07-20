import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import notificationReducer from './Slices/notificationSlice'

const reducer = combineReducers({
  notifications: notificationReducer,
})

const store = configureStore({
  reducer,
})

export default store
