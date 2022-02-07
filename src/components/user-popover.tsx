import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import {
  useProjectModal,
  useProjectsQueryKey,
} from "screens/project-list/utils";
import { ProjectModalButton } from "screens/project-list/project-modal-button";

export const UserPopover = () => {
  const { open } = useProjectModal();
  const { data: users, refetch } = useUsers();
  const content = (
    <ContainerDiv>
      <Typography.Text>组员列表</Typography.Text>
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
          </List.Item>
        )}
      />
      <Divider />
    </ContainerDiv>
  );
  return (
    <Popover
      content={content}
      placement={"bottom"}
      onVisibleChange={() => refetch()}
    >
      <Typography.Text>组员</Typography.Text>
    </Popover>
  );
};

const ContainerDiv = styled.div`
  padding: 0;
  min-width: 30rem;
`;
