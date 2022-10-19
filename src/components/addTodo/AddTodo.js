import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";

import { __postTodos } from "../../redux/modules/todosSlice";
import Button from "../../assets/button";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const initialstate = {
    id: 0,
    nickname: "",
    title: "",
    body: "",
    isLike: 0,
  };

  const [todo, SetTodo] = useState(initialstate);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const number = Date.now();

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    SetTodo({ ...todo, [name]: value, id: number });
    console.log(todo);
  };

  const onSubmithandler = async (e) => {
    if (
      todo.title.trim() === "" ||
      todo.body.trim() === "" ||
      todo.nickname.trim() === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    } else {
      e.preventDefault();
      dispatch(__postTodos(todo));
      SetTodo(initialstate);
      navigate("/");
    }
  };

  return (
    <AddTodoCtn>
      <AddTodoCtnArea>
        <AddTodoBox>
          <AddTodoTitle>작성자</AddTodoTitle>
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            error={todo.nickname.length > 5 ? true : false}
            helperText="작성자의 이름을 입력해주세요. (5자 이내)"
            maxLength="5"
            required
            onChange={onChangehandler}
            name="nickname"
            value={todo.nickname}
          />
        </AddTodoBox>
        <AddTodoBox>
          <AddTodoTitle>제목</AddTodoTitle>
          <AddTodoInput
            placeholder="제목을 입력해주세요. (50자 이내)"
            maxLength="50"
            required
            onChange={onChangehandler}
            name="title"
            value={todo.title}
          />
        </AddTodoBox>
        <AddTodoBox>
          <AddTodoTitle>내용</AddTodoTitle>
          <AddTodoTextarea
            placeholder="내용을 입력해주세요. (200자 이내)"
            maxLength="200"
            rows="10"
            required
            onChange={onChangehandler}
            name="body"
            value={todo.body}
          />
        </AddTodoBox>
      </AddTodoCtnArea>
      <PostBtn style={{ margin: "auto" }} onClick={onSubmithandler}>
        Post
      </PostBtn>
    </AddTodoCtn>
  );
};

const AddTodoCtn = styled.form`
  margin: 20px auto 0 auto;
  max-width: 500px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;

  justify-content: space-between;
`;
const AddTodoCtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  height: 100%;
`;
const AddTodoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
const AddTodoTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;
const AddTodoInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 12px;
  height: 46px;
  font-size: 14px;
`;
const AddTodoTextarea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  min-height: 120px;
  font-size: 14px;
`;

const PostBtn = styled.button`
  width: 200px;
  height: 65px;
  border: none;
  border-radius: 20px;
  background-color: white;
  :hover {
    box-shadow: 2px 2px 2px 2px black;
    background-color: whitesmoke;
  }
  font-size: 20px;
  font-weight: 800;
  font-family: "Permanent Marker", cursive;
  letter-spacing: 5px;
  color: black;
  box-shadow: 2px 2px 2px 2px gray;
`;

export default Post;
