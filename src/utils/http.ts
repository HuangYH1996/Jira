import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

// axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
// fetch不会抛出，需要自己判断是否 response.ok
//                                                                            给config加个默认值
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  // customConfig 中的method可以覆盖默认的 GET
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  // 使用http传入的method会覆盖默认method
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // 重新加载
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// custom hook api请求携带 token
export const useHttp = () => {
  const { user } = useAuth();
  // return (...[endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  // 直接从http里面获取数据类型

  // todo TS 工具类型
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
