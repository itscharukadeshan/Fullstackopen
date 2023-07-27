import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },
    logOut(state) {
      state.user = null
      state.token = ''
    },
  },
})

export const { setUser, setToken, logOut } = loginSlice.actions
export default loginSlice.reducer
