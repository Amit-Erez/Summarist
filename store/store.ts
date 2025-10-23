import { configureStore } from "@reduxjs/toolkit";
import uiLoginReducer from "@/slices/uiLoginSlice";

export const store = configureStore({
    reducer: {
        uiLogin: uiLoginReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;