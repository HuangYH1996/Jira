import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { useProjectModal } from "./utils";
import { ProjectModalButton } from "./project-modal-button";

export const ProjectListPopover = () => {
  const { open } = useProjectModal();
  const { data: projects } = useProjects();
  const pinnedList = projects?.filter((project) => project.pin);
  const content = (
    <ContainerDiv>
      <Typography.Text>收藏项目</Typography.Text>
      <List
        dataSource={pinnedList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
          </List.Item>
        )}
      />
      <Divider />
      {/* {props.projectModalButton} */}
      <ProjectModalButton setProjectModalOpen={open} />
    </ContainerDiv>
  );
  return (
    <Popover content={content} placement={"bottom"}>
      <Typography.Text>项目</Typography.Text>
    </Popover>
  );
};

const ContainerDiv = styled.div`
  padding: 0;
  min-width: 30rem;
`;
