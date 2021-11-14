import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 使用useAuth 取出 全局user状态
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    try {
      if (values.password !== cpassword) {
        onError(new Error("两次输入的密码不一致！"));
        return;
      }
      await run(register(values));
    } catch (e: any) {
      onError(e);
    }
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
          <Input placeholder="密码" id={"password"} />
        </Form.Item>
        <Form.Item
          name="cpassword"
          rules={[{ required: true, message: "请确认密码" }]}
        >
          <Input placeholder="请确认密码" id={"cpassword"} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} type="primary" htmlType="submit">
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};
