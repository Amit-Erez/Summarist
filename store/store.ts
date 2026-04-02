import { configureStore } from "@reduxjs/toolkit";
import uiLoginReducer from "@/slices/uiLoginSlice";
import userReducer from "@/slices/userSlice"
import fontSizeReducer from "@/slices/fontSizeSlice"
import bookReducer from "@/slices/bookSlice";
import savedReducer from "@/slices/savedSlice";
import finishedReducer from "@/slices/finishedSlice";
import mobileMenuReducer from "@/slices/mobileMenuSlice";


export const store = configureStore({
    reducer: {
        uiLogin: uiLoginReducer,
        user: userReducer,
        fontSize: fontSizeReducer,
        book: bookReducer,
        saved: savedReducer,
        finished: finishedReducer,
        mobileMenu: mobileMenuReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;