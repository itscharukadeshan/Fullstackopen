import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import notificationReducer from './Slices/notificationSlice'
import blogReducer from './Slices/blogsSlice'
import loginReducer from './Slices/loginSlice'
import userReducer from './Slices/usersSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'blogs', 'users'],
}

const rootReducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notifications: notificationReducer,
  users: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

const persistor = persistStore(store)

export { store, persistor }
