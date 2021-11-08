import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

// 获取api变量
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // search需要2个参数：项目名和id
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 对param添加防抖操作
  const debounceParam = useDebounce(param, 300);

  // user列表
  const [users, setUsers] = useState([]);

  // list列表
  const [list, setList] = useState([]);

  // usehttp
  const client = useHttp();

  // 当param改变时，去获取项目列表的数据
  useEffect(() => {
    // 默认是 GET 所以不用指定method
    client("projects", { data: cleanObject(debounceParam) }).then((response) =>
      setList(response)
    );
  }, [debounceParam]);

  // 初始化users一次
  useEffect(() => {
    // 可以直接省略
    client("users").then(setUsers);
  }, []);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;
