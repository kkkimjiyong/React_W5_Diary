import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __postTodos = createAsyncThunk(
  "todos/postTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_SERVER_PORT_POST,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_SERVER_PORT_POST);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __DeleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_PORT_POST}/${payload}`
      );

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __EditTodos = createAsyncThunk(
  "todos/editTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_PORT_POST}/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __PostLike = createAsyncThunk(
  "todos/postLike",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_PORT_POST}/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todolist",

  //대소문자 하나라도 틀리면 작동안함.
  initialState: {
    server: {
      todos: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {},

  extraReducers: {
    [__postTodos.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.todos.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postTodos.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getTodos.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.server.isLoading = false;
      state.server.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__DeleteTodos.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__DeleteTodos.fulfilled]: (state, action) => {
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.todos = state.server.todos.filter(
        (todo) => todo.id !== action.payload
      ); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__DeleteTodos.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__EditTodos.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__EditTodos.fulfilled]: (state, action) => {
      state.server.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.todos = state.server.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          return (todo = action.payload);
        } else return todo;
      });

      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__EditTodos.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__PostLike.pending]: (state) => {
      state.server.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__PostLike.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.server.todos = state.server.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          return (todo = action.payload);
        } else return todo;
      }); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__PostLike.rejected]: (state, action) => {
      state.server.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.server.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default todoSlice.reducer;
export const { Searchlist } = todoSlice.actions;
