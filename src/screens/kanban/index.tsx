import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban, useReorderTask } from "utils/kanban";
import { useTask, useTasks } from "utils/task";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./utils";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useCallback } from "react";

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

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext
      onDragEnd={(...params) => {
        onDragEnd(params[0]);
      }}
    >
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <Container>
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnsContainer>
              <Drop
                type={"COLUMN"}
                direction={"horizontal"}
                droppableId={"kanban"}
              >
                <DropChild style={{ display: "flex" }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
        </Container>
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  const { data: allTasks = [] } = useTasks(useTasksSearchParams());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // kanbn 排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // task 排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;

        const fromTask = allTasks?.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks?.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];

        if (fromTask?.id === toTask?.id) {
          return;
        }
        // const type = fromKanbanId === toKanbanId && source.index > destination.index ? 'before' : 'after'
        const type = source.index >= destination.index ? "before" : "after";
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          type,
          fromKanbanId,
          toKanbanId,
        });
      }
    },
    [kanbans, reorderKanban, reorderTask, allTasks]
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
`;
