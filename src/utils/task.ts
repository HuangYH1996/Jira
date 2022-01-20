import { Task } from "types/task";
import { useHttp } from "./http";
import { useQuery, QueryKey, useMutation } from "react-query";
import { cleanObject } from "utils";
import { useAddConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: cleanObject(param || {}) })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
