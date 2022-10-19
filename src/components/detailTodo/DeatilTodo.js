import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { __getTodos } from "../../redux/modules/todosSlice";
import { __getComments } from "../../redux/modules/commentslice";
import DetailEdit from "./DetailEdit";
import Comment from "../comments/Comment";
import Comments from "../comments/comments";

const DetailTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [commentedit, SetCommentedit] = useState(true);

  //작성일자 구하기
  var today = new Date(+id);
  var year = today.getFullYear();
  var hours = ("0" + today.getHours()).slice(-2);
  var minutes = ("0" + today.getMinutes()).slice(-2);
  var seconds = ("0" + today.getSeconds()).slice(-2);

  const todolist = useSelector((state) => state.todolist.server.todos);
  const comments = useSelector((state) => state.commentlist.comment);

  useEffect(() => {
    dispatch(__getTodos());
    dispatch(__getComments());
  }, [dispatch]);

  return (
    <div>
      {todolist.map((todo) => {
        if (todo.id === +id && edit === true) {
          return (
            <DetailTodoCtn key={todo.id}>
              <DetailHeader>
                <DetailTodoID>{`작성일자: ${year}년 ${hours}시 ${minutes}분 ${seconds}초`}</DetailTodoID>
                <DetailBody>
                  <div>{todo.title}</div>
                  <div>{todo.body}</div>
                </DetailBody>
                <BtnSet>
                  <BackBtn
                    onClick={() => {
                      navigate("/postlist");
                    }}
                  >
                    Back{" "}
                  </BackBtn>
                  <BackBtn
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  >
                    Edit
                  </BackBtn>
                </BtnSet>
                <Footer Clickprop={commentedit}>
                  <div
                    onClick={() => {
                      SetCommentedit(!commentedit);
                    }}
                  >
                    Add comment
                  </div>
                  <Comment />
                  {comments?.map((comment) => (
                    <Comments key={comment.id} comment={comment} id={id} />
                  ))}
                </Footer>
              </DetailHeader>
            </DetailTodoCtn>
          );
        } else if (todo.id === +id && edit === false) {
          return (
            <DetailEdit
              id={id}
              todolist={todolist}
              edit={edit}
              setEdit={setEdit}
              todo={todo}
            />
          );
        }
      })}
      ;
    </div>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: -12px;
  height: ${(props) => (props.Clickprop ? "40px" : "300px")};
  width: 100%;
  text-align: center;
  font-family: "Permanent Marker", cursive;
  border: none;
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 0px 2px 2px gray;
  padding: 10px;
  :hover {
    background-color: whitesmoke;
  }
`;

const DetailTodoCtn = styled.div`
  margin: 20px auto 0 auto;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Black Han Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 5px;
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

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 50px;
`;
export default DetailTodo;
