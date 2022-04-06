import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useAsync } from "utils/use-async";

const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSucess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const sucessState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isLoading: false,
  isSucess: true,
};

// hook 测试
test("useAsync 可以异步处理", async () => {
  let resolve: any, reject: any;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { result } = renderHook(() => useAsync());
  // result.current 就是 useAsync 返回的值
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    // run传入一个promise 即处于loading状态
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    // 改变 promise 状态
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...sucessState,
    data: resolvedValue,
  });
});
