import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/font.css";
import { AiFillEdit } from "react-icons/ai";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <HeaderCtn>
      <FaHome
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
        className="icon"
        size="26"
      />
      <AiFillEdit
        size="26"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/posting");
        }}
      />

      <HeaderName>{children}</HeaderName>
    </HeaderCtn>
  );
};

const HeaderCtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 430px;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid;
`;
const HeaderName = styled.h1`
  font-size: 18px;
  font-family: "Permanent Marker", cursive;
`;

export default Header;
