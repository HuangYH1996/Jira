import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

interface AuthForm {
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

// value指定一个泛型类型
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    isIdle,
    error,
    isError,
    setData: setUser,
    data: user,
  } = useAsync<User | null>();
  // const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

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

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// custom hook
export const useAuth = () => {
  // 接收一个context对象，并返回当前context的当前值，由上层组件中距离最近的Provider的value决定
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
