import { useEffect, useState } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = () => {
  const client = useHttp();
  // user列表
  const [users, setUsers] = useState([]);

  const { run } = useAsync();
  // 初始化users一次
  useEffect(() => {
    run(client("users"));
    client("users").then(setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return users;
};
