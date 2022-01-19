import { Task } from "types/task";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: cleanObject(param || {}) })
  );
};
