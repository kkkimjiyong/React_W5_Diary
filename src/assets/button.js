import React from "react";
import styled, { css } from "styled-components";

const Button = ({ children, onClick }) => {
  return (
    <Btn {...children} onClick={onClick}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
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

export default Button;
