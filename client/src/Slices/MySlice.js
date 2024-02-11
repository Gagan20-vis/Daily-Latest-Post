import { createSlice } from "@reduxjs/toolkit";
const initialState = ({
    alert: {
        success: true,
        message: null,
    },
    currUser: null,
    allPosts: null,
})
export const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        SET_ALERT: (state, action) => {
            state.alert = action.payload;
        },
        SET_CURR_USER: (state, action) => {
            state.currUser = action.payload;
        },
        SET_ALL_POST: (state, action) => {
            state.allPosts = action.payload;
        }
    }
})
export const {
    SET_ALERT,
    SET_CURR_USER,
    SET_ALL_POST
} = BlogSlice.actions;
export default BlogSlice.reducer
