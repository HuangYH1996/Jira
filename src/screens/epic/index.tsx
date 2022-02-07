import { Button, List } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl, useTasksSearchParams } from "screens/kanban/utils";
import { useDocumentTitle } from "utils";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";

export const EpicScreen = () => {
  useDocumentTitle("任务组列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  // 得到属于 currentProject 的 tasks
  const { data: tasks } = useTasks({ projectId: currentProject?.id });

  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());

  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        itemLayout={"vertical"}
        style={{ overflow: "scroll" }}
        renderItem={(epic) => (
          <List.Item key={epic.id}>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button
                    type={"link"}
                    onClick={() => deleteEpic({ id: epic.id })}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  <div>
                    {tasks
                      ?.filter((task) => task.epicId === epic.id)
                      .map((task) => (
                        <Row>
                          <Link
                            to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                          >
                            {task.name}
                          </Link>
                        </Row>
                      ))}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => {
          setEpicCreateOpen(false);
        }}
      />
    </ScreenContainer>
  );
};
