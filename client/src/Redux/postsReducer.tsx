import {
  PayloadAction,
  configureStore,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface PostType {
  _id: string;
  username: String;
  content: String;
  likes: Number;
  likeyBy: Array<String>;
  comments: Array<String>;
}

const initialState: PostType[] = [];

export const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const post = action.payload;

      if (Array.isArray(post)) {
        return [...action.payload];
      } else {
        const updatedState = current(state).map((item) => {
          if (item._id == post._id) {
            return {
              ...item,
              likes: post.likes,
              likedBy: post.likedBy,
            };
          }

          return item;
        });
        return updatedState; // Add this return statement
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts } = postReducer.actions;

export default postReducer.reducer;
