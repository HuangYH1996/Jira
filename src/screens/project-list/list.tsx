import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";

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
  const { mutate } = useEditProject();
  const mutateProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin }).then(props.refresh);
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
