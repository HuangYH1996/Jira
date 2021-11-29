import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import * as authStore from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

// bootStrap 启动
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 根据token 从 me 这个api获取user
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isLoading, isIdle, error, isError } = useAsync<User | null>();

  // 刷新的时候 AuthProvider重新加载时 初始化一次
  useMount(() => {
    // bootstrapUser().then(setUser);
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorCallback error={error} />;
  }

  return <div>{children}</div>;
};

// custom hook
export const useAuth = () => {
  // const dispatch = useDispatch()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  // login({username:'123', password: '123'}).then
  return {
    user,
    login,
    register,
    logout,
  };
};
