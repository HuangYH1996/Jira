import "../../../src/wdyr";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectParam } from "./utils";
import { Row } from "components/lib";
import { ProjectModalButton } from "./project-modal-button";

export const ProjectListScreen = () => {
  // search需要2个参数：项目名和id
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });

  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // // 对param中的personId进行类型转换
  // const projectParam = {...param, personId: Number(param.personId) || undefined}

  const [param, setParam] = useProjectParam();
  // 对param添加防抖操作
  const debounceParam = useDebounce(param, 300);

  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  const { isLoading, error, data: list, retry } = useProject(debounceParam);

  // user列表
  const users = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ProjectModalButton />
      </Row>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users}
        dataSource={list || []}
        loading={isLoading}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 2rem;
`;
