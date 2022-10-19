import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __DeleteTodos } from "../../redux/modules/todosSlice";
import { __DeleteComment } from "../../redux/modules/commentslice";

const Todo = ({ todo, posts, Setposts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickDeleteButtonHandler = (todoId) => {
    Setposts(posts.filter((post) => post.id !== todoId));
    dispatch(__DeleteTodos(todoId));
    dispatch(__DeleteComment(todoId));
  };

  // const Likehandler = async () => {
  //   Setlike(like + 1);
  //   SetTodo({ ...todo, isLike: like });
  //   await dispatch(__PostLike(Todo));
  //   console.log(Todo);
  // };

  return (
    <ListCtn key={todo.id}>
      <ListCtn2>
        <ListTitle>{todo.title}</ListTitle>
        <ListNickname>{todo.nickname}</ListNickname>
      </ListCtn2>
      <ListBtnset>
        {/* <button onClick={() => Likehandler()}>{like} 좋아요</button> */}
        <ListBtn
          size="small"
          onClick={() => {
            navigate(`/postlist/${todo.id}`);
          }}
        >
          Detail
        </ListBtn>{" "}
        <ListBtn
          onClick={(event) => {
            onClickDeleteButtonHandler(todo.id);
          }}
        >
          Delete
        </ListBtn>
      </ListBtnset>
    </ListCtn>
  );
};

const ListCtn = styled.div`
  border: 3px solid #ddd;
  border-style: inset;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: whitesmoke;
  }
`;
const ListCtn2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 30px;
`;
const ListTitle = styled.h3`
  font-size: 25px;
  font-weight: 400;
  font-family: "Black Han Sans", sans-serif;
`;
const ListNickname = styled.p`
  font-size: 18px;
  color: gray;
  font-family: "Black Han Sans", sans-serif;
`;

const ListBtn = styled.button`
  width: 100px;
  height: 60px;
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

const ListBtnset = styled.div`
  display: flex;
  gap: 20px;
`;
export default Todo;
