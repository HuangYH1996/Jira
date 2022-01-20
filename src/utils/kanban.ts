import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";
import { QueryKey, useMutation } from "react-query";
import { useAddConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: cleanObject(param || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
