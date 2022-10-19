import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { __postComment } from "../../redux/modules/commentslice";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../assets/button";

const Comment = () => {
  const number = useParams();
  const initialState = { name: "", body: "" };

  const dispatch = useDispatch();
  const [comment, setComment] = useState(initialState);

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
      postid: number.id,
    });
  };

  const onSubmithandler = (e) => {
    e.preventDefault();
    dispatch(__postComment(comment));
    setComment(initialState);
  };

  return (
    <AddComment>
      <CommentInput
        onChange={onChangehandler}
        name="name"
        value={comment.name}
      />
      <CommentInput
        onChange={onChangehandler}
        name="body"
        value={comment.body}
      />
      <CommentBtn onClick={onSubmithandler}>Add</CommentBtn>
    </AddComment>
  );
};

const AddComment = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  justify-content: center;
`;

const CommentInput = styled.input`
  box-shadow: 2px 2px 2px 2px gray;
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 200px;
  padding-left: 30px;
  font-size: 20px;
  font-weight: 600px;
`;

const CommentBtn = styled.button`
  border: none;
  height: 30px;
  border-radius: 10px;
  width: 80px;
  box-shadow: 2px 2px 2px 2px gray;
  font-family: "Permanent Marker", cursive;
`;

export default Comment;
