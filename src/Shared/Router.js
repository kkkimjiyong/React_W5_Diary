import React from "react";
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Comment from "../components/comments/Comment";
import AddPage from "../pages/AddPage";
import Home from "../pages/Home";
import Todos from "../pages/Todos";
import DetailTodo from "../components/detailTodo/DeatilTodo";
import NotFound from "../pages/NotFound";
// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posting" element={<AddPage />} />
        <Route path="/postlist" element={<Todos />} />
        <Route path="/postlist/:id" element={<DetailTodo />} />
        <Route path="/comment/:id" element={<Comment />} />
        <Route component={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
