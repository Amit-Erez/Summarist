import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  plan: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isPlanLoading: boolean
}

const initialState: UserState = {
  uid: null,
  email: null,
  plan: null,
  isLoggedIn: false,
  isLoading: true,
  isPlanLoading: true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isLoading: false };
    },
    clearUser: (state) => {
      return { ...initialState, isLoading: false };
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    finishPlanLoading: (state) => {
      state.isPlanLoading = false;
    },
  },
});

export const { setUser, clearUser, finishLoading, finishPlanLoading } = userSlice.actions;
export default userSlice.reducer;
