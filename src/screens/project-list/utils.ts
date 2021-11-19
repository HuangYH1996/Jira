import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // 对param中的personId进行类型转换

  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      };
    }, [param]),
    setParam,
  ] as const;
};
