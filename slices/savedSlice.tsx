import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "@/types/book";

const stored = typeof window !== "undefined" ? localStorage.getItem("savedBooks") : null;
const parsed = stored ? JSON.parse(stored) : [];

const initialState: { savedBooks: Book[] } = {
  savedBooks: parsed,
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveBook: (state, action: PayloadAction<Book>) => {
      state.savedBooks.push(action.payload);
      localStorage.setItem("savedBooks", JSON.stringify(state.savedBooks));
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.savedBooks = state.savedBooks.filter(
        (book) => book.id !== action.payload
      );
      localStorage.setItem("savedBooks", JSON.stringify(state.savedBooks));
    },
  },
});

export const { saveBook, removeBook } = savedSlice.actions;
export default savedSlice.reducer;
