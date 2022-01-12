import { useProject } from "utils/project";
import { useProjectsSearchParams } from "utils/project-list";
import { useUrlQueryParam } from "utils/url";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = (value: boolean) => setProjectCreate({ projectCreate: value });
  const close = () => {
    setEditingProjectId({ editingProjectId: undefined });
    setProjectCreate({ projectCreate: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  // 直接从url读取的值是字符串类型
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProjectsQueryKey = () => {
  const [searchQueryParmas] = useProjectsSearchParams();
  return ["projects", searchQueryParmas];
};
