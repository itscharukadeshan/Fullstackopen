import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import notificationSliceReducer from './Slices/notificationSlice'

const reducer = combineReducers({
  notifications: notificationSliceReducer,
})

const store = configureStore({
  reducer,
})

export default store
