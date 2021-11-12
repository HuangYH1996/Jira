import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
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
  ];

  return <Table pagination={false} columns={columns} {...props} />;
};
