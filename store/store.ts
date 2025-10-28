import { configureStore } from "@reduxjs/toolkit";
import uiLoginReducer from "@/slices/uiLoginSlice";
import userReducer from "@/slices/userSlice"
import fontSizeReducer from "@/slices/fontSizeSlice"
import bookReducer from "@/slices/bookSlice";


export const store = configureStore({
    reducer: {
        uiLogin: uiLoginReducer,
        user: userReducer,
        fontSize: fontSizeReducer,
        book: bookReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;