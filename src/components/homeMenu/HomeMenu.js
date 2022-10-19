import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function HomeMenu() {
  const navigate = useNavigate();

  return (
    <HomeMenuCtn>
      <HomeMenuName>무엇을 할까요?</HomeMenuName>
      <HomeMenuBtn
        onClick={() => {
          navigate("./posting");
        }}
      >
        <HomeMenuTitle>할일 기록하기</HomeMenuTitle>
        <FaAngleRight size="30" color="#1a73e8" />
      </HomeMenuBtn>
      <HomeMenuBtn
        onClick={() => {
          navigate("./postlist");
        }}
      >
        <HomeMenuTitle>TODO LIST</HomeMenuTitle>
        <FaAngleRight size="30" color="#1a73e8" />
      </HomeMenuBtn>
    </HomeMenuCtn>
  );
}

const HomeMenuCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;
const HomeMenuName = styled.h2`
  margin-top: 40px;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 20px;
`;
const HomeMenuBtn = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const HomeMenuTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

export default HomeMenu;
