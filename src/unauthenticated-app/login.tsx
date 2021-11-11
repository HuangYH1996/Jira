import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  // 使用useAuth 取出 全局user状态
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    login(values);
  };
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <LongButton type="primary" htmlType="submit">
            登录
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};
