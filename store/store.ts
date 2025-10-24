import { configureStore } from "@reduxjs/toolkit";
import uiLoginReducer from "@/slices/uiLoginSlice";
import userReducer from "@/slices/userSlice"

export const store = configureStore({
    reducer: {
        uiLogin: uiLoginReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;