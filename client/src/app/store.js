import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../Slices/MySlice';
export const store = configureStore({
    reducer: blogReducer
})