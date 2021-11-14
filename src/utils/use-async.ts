import { useState } from "react";

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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  // 默认为defaultConfig 然后用initialConfig来覆盖它（如果有的话）
  const config = { ...defaultConfig, ...initialConfig };
  // 真正用到的state， 先默认，再用用户定义的state进行覆盖
  // 泛型指定state的类型
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      data: null,
      stat: "error",
      error,
    });
  };

  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
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
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucess: state.stat === "success",
    setData,
    setError,
    run,
    ...state,
  };
};
