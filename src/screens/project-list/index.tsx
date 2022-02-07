import "../../../src/wdyr";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "utils/project-list";
import { ErrorBox, Row } from "components/lib";
import { ProjectModalButton } from "./project-modal-button";
import { useProjectModal } from "./utils";
import { User } from "types/user";

export const ProjectListScreen = () => {
  // search需要2个参数：项目名和id
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });

  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // // 对param中的personId进行类型转换
  // const projectParam = {...param, personId: Number(param.personId) || undefined}
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  // 对param添加防抖操作
  const debounceParam = useDebounce(param, 300);

  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  const { isLoading, error, data: list } = useProjects(debounceParam);

  // user列表
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ProjectModalButton setProjectModalOpen={open} />
      </Row>
      <SearchPanel
        users={users as User[]}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {/* {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null} */}
      <ErrorBox error={error} />
      <List
        // refresh={retry}
        users={users as User[]}
        dataSource={list || []}
        loading={isLoading}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 2rem;
  flex: 1;
`;
