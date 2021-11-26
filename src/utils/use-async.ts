import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./mount";

interface State<D> {
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
  error: Error | null;
}

const defaultInitialState: State<null> = {
  data: null,
  stat: "idle",
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

// 组件mounted的时候才去dispatch进行更新state
// 返回一个新的dispatch函数
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...outerArgs) => {
      mountedRef.current ? dispatch(...outerArgs) : void 0;
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  // 默认为defaultConfig 然后用initialConfig来覆盖它（如果有的话）
  const config = { ...defaultConfig, ...initialConfig };
  // 真正用到的state， 先默认，再用用户定义的state进行覆盖
  // 泛型指定state的类型
  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState,
  // });

  // useReducer改写
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => {
      return { ...state, ...action };
    },
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        stat: "success",
        error: null,
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        stat: "error",
        error,
      });
    },
    [safeDispatch]
  );

  const [retry, setRetry] = useState(() => () => {});

  // run用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      // setState((prevState) => ({ ...prevState, stat: "loading" }));
      dispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucess: state.stat === "success",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
