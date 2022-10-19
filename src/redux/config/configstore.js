// 원래 있던 코드
import { configureStore } from "@reduxjs/toolkit";

// 새롭게 추가한 부분
import todolist from "../modules/todosSlice.js";
import commentlist from "../modules/commentslice.js";

const store = configureStore({
  reducer: {
    todolist,
    commentlist,
  },
});

export default store;
