import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import notificationReducer from './Slices/notificationSlice'
import blogReducer from './Slices/blogsSlice'
import loginReducer from './Slices/loginSlice'

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notifications: notificationReducer,
})

const store = configureStore({
  reducer,
})

export default store
