import { useQuery, useMutation } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

// 参数为要传入的搜索对象
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
  // const { run, ...rest } = useAsync<Project[]>();

  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [client, param]
  // );

  // // 当param改变时，去获取项目列表的数据
  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param, fetchProjects, run]);

  // return rest;
};

// 编辑
export const useEditProject = (queryKey: QueryKey) => {
  // const { run, ...resultAsync } = useAsync<Project[]>();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH"
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...resultAsync
  // };
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

// 新增
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const { run, ...resultAsync } = useAsync<Project[]>();
  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST"
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...resultAsync
  // };
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 删除
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  // id 为undefined 时不执行这个请求
  return useQuery<Project>(["project", id], () => client(`projects/${id}`), {
    enabled: !!id,
  });
};
