import { Button, List } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectInUrl, useTasksSearchParams } from "screens/kanban/utils";
import { useDocumentTitle } from "utils";
import { useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useEpicSearchParams } from "./utils";

export const EpicScreen = () => {
  useDocumentTitle("任务组列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: epics, isLoading: epicsIsLoading } = useEpics();
  // 得到属于 currentProject 的 tasks
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  console.log("epics", epics);

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}任务组</h1>
      <List
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item key={epic.id}>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"}>删除</Button>
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
    </ScreenContainer>
  );
};
