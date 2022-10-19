import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Todo from "./Todo";
import { __getTodos } from "../../redux/modules/todosSlice";
import { useState } from "react";
import "../../assets/font.css";
import Button from "../../assets/button";
import { useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const TodosList = () => {
  const dispatch = useDispatch();
  // api에서 가져오면 전역변수가 필요없어지지않나?
  const { isLoading, error, todos } = useSelector(
    (state) => state.todolist.server
  );
  // const Todolist = todos.sort((a, b) => a.id - b.id);

  const [isSearch, SetisSearch] = useState(true);
  const [SearchTodo, SetSearchTodo] = useState("");

  const onChangehandler = (e) => {
    const { value } = e.target;
    SetSearchTodo(value);
  };

  // const [firstlist, Setfirstlist] = useState(splice);
  // const [secondlist, Setsecondlist] = useState([]);

  // const Scrollhandler = () => {
  //   Setfirstlist(todos.slice(0, 5));
  //   Setsecondlist(todos.slice(5));
  // };

  const [posts, Setposts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_PORT_POST}?_limit=5&_page=${page.current}`
      );
      Setposts((prevPosts) => [...prevPosts, ...data]);
      setHasNextPage(data.length == 5);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const [ref, inView] = useInView();

  useEffect(() => {
    console.log(inView, hasNextPage);

    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  //id 시간순으로 정렬
  const list = [...todos];
  const lista = list.sort((a, b) => b.id - a.id);

  if (isLoading) {
    <div>로딩중입니당</div>;
  } else if (error) {
    <div>에러가 났엉쇼</div>;
  } else {
    return (
      <>
        <TodosListCtn>
          <HomeMenuName>
            {isSearch ? "Our Diary" : `${SearchTodo}'s Diary`}
          </HomeMenuName>
          <SearchBar>
            <SearchInput
              disabled={!isSearch}
              onChange={onChangehandler}
              placeholder={"닉네임으로 검색해볼까요?"}
              value={SearchTodo || ""}
            ></SearchInput>
            <Button
              onClick={() => {
                isSearch ? SetisSearch(!isSearch) : SetSearchTodo("");
                SetisSearch(!isSearch);
              }}
            >
              {isSearch ? "Search" : "Return"}
            </Button>
          </SearchBar>

          {/* 공백이면 검생기능 비활성화 */}
          {SearchTodo.trim() === "" || isSearch ? (
            <>
              <TodosListBox>
                {/* 값이 없었다가 있을 때, 실행되게. */}

                {posts.map((todo) => {
                  return <Todo key={todo.id} todo={todo} />;
                })}
              </TodosListBox>
              <div ref={ref} style={{ position: "absolute", bottom: "0px" }}>
                안녕
              </div>
            </>
          ) : (
            <TodosListBox>
              {lista.map((todo) => {
                if (todo.nickname == SearchTodo) {
                  return <Todo key={todo.id} todo={todo} />;
                }
              })}
            </TodosListBox>
          )}
        </TodosListCtn>
      </>
    );
  }
};

const TodosListCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;
const HomeMenuName = styled.h2`
  margin-top: 40px;
  font-size: 5rem;
  font-weight: 1200;
  margin-bottom: 20px;
  font-family: "Permanent Marker", cursive;
  letter-spacing: 5px;
`;
const TodosListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  box-shadow: 2px 2px 2px 2px gray;
  border: none;
  border-radius: 10px;
  height: 60px;
  width: 800px;
  padding-left: 30px;
  font-size: 20px;
  font-weight: 600px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default TodosList;
