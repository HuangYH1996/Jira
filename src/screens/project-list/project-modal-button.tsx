import { Button } from "antd";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectModalButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      style={{ padding: 0 }}
      type={"link"}
      onClick={() => dispatch(projectListActions.projectModalOpen())}
    >
      创建项目
    </Button>
  );
};
