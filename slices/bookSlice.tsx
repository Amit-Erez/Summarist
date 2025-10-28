import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "@/types/book";

const initialState: { currentBook: Book | null } = {
  currentBook: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook: (state, action: PayloadAction<Book>) => {
      state.currentBook = action.payload;
    },
    clearBook: (state) => {
      state.currentBook = null;
    },
  },
});

export const { setCurrentBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;
