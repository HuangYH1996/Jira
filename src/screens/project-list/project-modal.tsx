import { Drawer, Typography } from "antd";
import { useProjectModal } from "utils/url";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width="100%" visible={projectModalOpen} onClose={close}>
      <Typography.Text>收藏项目</Typography.Text>
    </Drawer>
  );
};
