import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 参数为要传入的搜索对象
export const useProject = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...rest } = useAsync<Project[]>();

  const fetchProjects = () => client("projects", { data: cleanObject(param) });

  // 当param改变时，去获取项目列表的数据
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};

// 编辑
export const useEditProject = () => {
  const client = useHttp();
  const { run, ...resultAsync } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...resultAsync,
  };
};

// 新增
export const useAddProject = () => {
  const client = useHttp();
  const { run, ...resultAsync } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...resultAsync,
  };
};
