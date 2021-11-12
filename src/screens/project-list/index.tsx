import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListScreen = () => {
  // search需要2个参数：项目名和id
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 对param添加防抖操作
  const debounceParam = useDebounce(param, 300);

  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  const { isLoading, error, data: list } = useProject(debounceParam);

  // user列表
  const users = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users} dataSource={list || []} loading={isLoading}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;
