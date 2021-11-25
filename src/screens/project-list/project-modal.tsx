import { Drawer, Typography } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  setProjectModalClose: () => void;
}) => {
  return (
    <Drawer
      width="100%"
      visible={props.projectModalOpen}
      onClose={props.setProjectModalClose}
    >
      <Typography.Text>收藏项目</Typography.Text>
    </Drawer>
  );
};
