import { Drawer, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { projectListActions } from "./project-list.slice";

export const ProjectModal = () => {
  const projectModalState = useSelector(
    (state: RootState) => state.projectModal.projectModalOpen
  );
  const dispatch = useDispatch();
  return (
    <Drawer
      width="100%"
      visible={projectModalState}
      onClose={() => dispatch(projectListActions.projectModalClose())}
    >
      <Typography.Text>收藏项目</Typography.Text>
    </Drawer>
  );
};
