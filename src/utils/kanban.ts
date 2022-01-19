import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: cleanObject(param || {}) })
  );
};
