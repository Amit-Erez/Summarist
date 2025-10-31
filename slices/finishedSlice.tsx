import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "@/types/book";

const stored = typeof window !== "undefined" ? localStorage.getItem("finishedBooks") : null;
const parsed = stored ? JSON.parse(stored) : [];

const initialState: { finishedBooks: Book[] } = {
  finishedBooks: parsed,
};

export const finishedSlice = createSlice({
  name: "finished",
  initialState,
  reducers: {
    addFinished: (state, action: PayloadAction<Book>) => {
      state.finishedBooks.push(action.payload);
      localStorage.setItem("finishedBooks", JSON.stringify(state.finishedBooks));
    },
    removeFinished: (state, action: PayloadAction<string>) => {
      state.finishedBooks = state.finishedBooks.filter(
        (book) => book.id !== action.payload
      );
      localStorage.setItem("finishedBooks", JSON.stringify(state.finishedBooks));
    },
  }
})

export const { addFinished, removeFinished } = finishedSlice.actions
export default finishedSlice.reducer