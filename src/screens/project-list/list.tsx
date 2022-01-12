import { Button, Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModal } from "../project-list/utils";
import { useProjectsQueryKey } from "./utils";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const mutateProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin });
  };

  const columns = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(text: string, record: Project) {
        return (
          <Pin
            checked={record.pin}
            onCheckedChange={mutateProject(record.id)}
          />
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
      render(text: string, record: Project) {
        return <Link to={String(record.id)}>{text}</Link>;
      },
    },
    {
      title: "所属组别",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "创建时间",
      render(project: Project) {
        return <span>{dayjs(project.created).format("YYYY/MM/DD")}</span>;
      },
    },
    {
      title: "负责人",
      render(project: Project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name}
          </span>
        );
      },
    },
    {
      title: "",
      render(project: Project) {
        return <More project={project} />;
      },
    },
  ];

  return (
    <Table
      rowKey={(record) => record.name}
      pagination={false}
      columns={columns}
      {...props}
    />
  );
};

export const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} style={{ color: "black" }}>
        ...
      </Button>
    </Dropdown>
  );
};
