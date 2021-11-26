import { Button } from "antd";

export const ProjectModalButton = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Button
      style={{ padding: 0 }}
      type={"link"}
      onClick={() => props.setProjectModalOpen(true)}
    >
      创建项目
    </Button>
  );
};
