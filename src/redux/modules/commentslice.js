import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __postComment = createAsyncThunk(
  "todos/postTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_SERVER_PORT_COMMENT,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getComments = createAsyncThunk(
  "todos/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_SERVER_PORT_COMMENT,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __DeleteComment = createAsyncThunk(
  "todos/deleteComment",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_PORT_COMMENT}/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __EditComment = createAsyncThunk(
  "todos/editComment",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_PORT_COMMENT}/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "commentlist",

  //대소문자 하나라도 틀리면 작동안함.
  initialState: {
    comment: [],
    server: {
      todos: [],
      isLoading: false,
      error: null,
    },
  },

  extraReducers: {
    [__getComments.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postComment.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postComment.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__DeleteComment.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__DeleteComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment = state.comment.filter((c) => c.id !== action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__DeleteComment.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__EditComment.pending]: (state, action) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__EditComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment = state.comment.map((comment) => {
        if (comment.id == action.payload.id) {
          return (comment = action.payload);
        } else {
          return comment;
        }
      });
    },
    [__EditComment.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default commentSlice.reducer;
