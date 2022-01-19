import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  // 获取看板数据
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  // 从url内容获取相应project
  const { data: currentProject } = useProjectInUrl();
  return (
    <>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <div key={kanban.id}>
            <KanbanColumn kanban={kanban} />
          </div>
        ))}
      </ColumnContainer>
    </>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
