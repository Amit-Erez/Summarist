import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fontSize: "small"
}

export const fontSizeSlice = createSlice({
  name: 'fontSize',
  initialState,
  reducers: {
    resizeSmall: (state) => {
      state.fontSize = "small"
    },
    resizeMedium: (state) => {
      state.fontSize = "medium"
    },
    resizeLarge: (state) => {
      state.fontSize = "large"
    },
    resizeXlarge: (state) => {
      state.fontSize = "xlarge"
    },
  },
})

export const { resizeSmall, resizeMedium, resizeLarge, resizeXlarge } = fontSizeSlice.actions
export default fontSizeSlice.reducer