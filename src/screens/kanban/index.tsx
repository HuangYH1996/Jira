import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";
import { CreateKanban } from "./create-kanban";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  // 获取看板数据
  const { data: kanbans, isLoading: kanbansIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  // 从url内容获取相应project
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbansIsLoading || taskIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            {kanbans?.map((kanban) => (
              <KanbanColumn kanban={kanban} />
            ))}
            <CreateKanban />
          </ColumnsContainer>
        )}
      </Container>
    </ScreenContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
`;
