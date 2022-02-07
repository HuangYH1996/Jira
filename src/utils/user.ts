import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  // user列表
  const [users, setUsers] = useState([]);

  // const { run } = useAsync();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );

  // // 初始化users一次
  // useEffect(() => {
  //   run(client("users"));
  //   client("users").then(setUsers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
};
