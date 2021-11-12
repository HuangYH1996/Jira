import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 参数为要传入的搜索对象
export const useProject = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...rest } = useAsync<Project[]>();

  // 当param改变时，去获取项目列表的数据
  useEffect(() => {
    run(client("projects", { data: cleanObject(param) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};
