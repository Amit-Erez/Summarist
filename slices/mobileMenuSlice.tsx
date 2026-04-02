import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMobileMenuOpen: false,
}

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState, 
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const { toggleMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
