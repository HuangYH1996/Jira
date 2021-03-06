import { QueryKey } from "react-query";
import { useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

// 这里类型太复杂了，所以使用any大法
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(err: any, newTodo: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => [...old, target]);
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old.filter((project: { id: any }) => project.id !== target.id)
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old.map((item: { id: any }) =>
      item.id === target.id ? { ...item, ...target } : item
    )
  );

export const useReorderConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => []);

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
