import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  users: User[];
  list: Project[];
}

export const List = ({ users, list }: ListProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
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
  ];

  return <Table pagination={false} dataSource={list} columns={columns} />;
};
