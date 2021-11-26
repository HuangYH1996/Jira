import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProject } from "utils/project";

export const ProjectListPopover = (props: {
  projectModalButton: JSX.Element;
}) => {
  const { data: projects } = useProject();
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
      {props.projectModalButton}
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
