import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";
import { QueryKey, useMutation } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig,
  useReorderKanbanConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

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

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 看板拖拽持久化

export interface SortProps {
  // 要重新排序的item
  fromId: number;
  // 目标item
  referenceId: number;
  // 放在目标item的前面或后面
  type: "before" | "after";

  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client("kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    // useReorderConfig(queryKey)
    useReorderKanbanConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client("tasks/reorder", {
        data: params,
        method: "POST",
      }),
    // useReorderConfig(queryKey)
    useReorderTaskConfig(queryKey)
  );
};
