import React from "react";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { __EditTodos } from "../../redux/modules/todosSlice";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DetailEdit = ({ setEdit, edit, todo }) => {
  //   const onClickDeleteButtonHandler = (Id) => {
  //     const { data } = axios.delete(`http://localhost:3001/posts/${Id}`);
  //     dispatch(Deletelist(data));
  //   };
  const initialState = {
    id: 0,
    nickname: "",
    title: "",
    body: "",
    isDone: false,
    isEdit: true,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(initialState);

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setEditTodo({
      ...editTodo,
      nickname: todo.nickname,
      [name]: value,
      id: todo.id,
    });
  };

  const onClickEditButtonHandler = async (editTodo) => {
    if (editTodo.title.trim() === "" || editTodo.body.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    } else {
      await dispatch(__EditTodos(editTodo));
      setEdit(!edit);
    }
  };

  return (
    <DetailTodoCtn key={todo.id}>
      <DetailHeader>
        <DetailTodoID>{todo.id}</DetailTodoID>
        <EditInput
          name="title"
          type="text"
          placeholder="제목 수정"
          onChange={onChangehandler}
        />
        <EditInput
          name="body"
          type="text"
          placeholder="내용 수정"
          onChange={onChangehandler}
        />
        <BtnSet>
          <BackBtn
            onClick={() => {
              navigate("/postlist");
            }}
          >
            Back
          </BackBtn>
          <BackBtn
            onClick={() => {
              onClickEditButtonHandler(editTodo);
            }}
          >
            Done
          </BackBtn>
        </BtnSet>
      </DetailHeader>
    </DetailTodoCtn>
  );
};

// transition: height 400ms ease-in-out 0s;

const DetailTodoCtn = styled.div`
  margin: 20px auto 0 auto;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`;
const DetailHeader = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 150px;
`;
const DetailTodoID = styled.p``;

const BackBtn = styled.button`
  width: 100px;
  height: 40px;
  letter-spacing: 3px;
  font-weight: 400;
  border: none;
  border-radius: 20px;
  background-color: white;
  box-shadow: 1px 1px 1px 1px gray;
  font-family: "Permanent Marker", cursive;
  :hover {
    background-color: whitesmoke;
    box-shadow: 2px 2px 2px 2px gray;
  }
`;
const BtnSet = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const EditInput = styled.input`
  box-shadow: 2px 2px 2px 2px gray;
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 200px;
  padding-left: 30px;
  font-size: 20px;
  font-weight: 600px;
`;

export default DetailEdit;
