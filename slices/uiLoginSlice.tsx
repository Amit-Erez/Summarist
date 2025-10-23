import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoginOpen: false,
}

export const uiLoginSlice = createSlice({
  name: 'uiLogin',
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true
    },
    closeLogin: (state) => {
      state.isLoginOpen = false
    },
  },
})

export const { openLogin, closeLogin } = uiLoginSlice.actions
export default uiLoginSlice.reducer