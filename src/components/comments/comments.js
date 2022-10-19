import React, { useState } from "react";
import {
  __DeleteComment,
  __EditComment,
} from "../../redux/modules/commentslice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Comments = ({ id, comment }) => {
  const dispatch = useDispatch();
  const DeleteCommenthandler = (commentId) => {
    dispatch(__DeleteComment(commentId));
  };

  const [Editstatus, SetEditstatus] = useState(true);

  const initialState = { name: "", body: "" };

  const [editcomment, seteditComment] = useState(initialState);

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    seteditComment({
      ...editcomment,
      [name]: value,
      postid: id,
      id: comment.id,
    });
  };

  const onClickEditButtonHandler = (editcomment) => {
    dispatch(__EditComment(editcomment));
    SetEditstatus(!Editstatus);
    seteditComment(initialState);
  };

  if (comment.postid === id)
    return (
      //키값을 무얷으로 줘야할까?
      <Commentsbox key={comment.id}>
        {Editstatus ? (
          <>
            <div>{comment.name}</div>
            <div>{comment.body}</div>
          </>
        ) : (
          <>
            <input
              name="name"
              value={editcomment.name}
              onChange={onChangehandler}
            ></input>
            <input
              name="body"
              value={editcomment.body}
              onChange={onChangehandler}
            ></input>
          </>
        )}

        <Btnset>
          <CommentBtn
            onClick={() => {
              DeleteCommenthandler(comment.id);
            }}
          >
            Delete
          </CommentBtn>

          {Editstatus ? (
            <CommentBtn
              onClick={() => {
                SetEditstatus(!Editstatus);
              }}
            >
              Edit
            </CommentBtn>
          ) : (
            <CommentBtn
              onClick={() => {
                onClickEditButtonHandler(editcomment);
              }}
            >
              Done
            </CommentBtn>
          )}
        </Btnset>
      </Commentsbox>
    );
};

const Commentsbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  margin-top: 20px;
`;

const Btnset = styled.div`
  display: flex;
  gap: 20px;
`;

const CommentBtn = styled.button`
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

export default Comments;
