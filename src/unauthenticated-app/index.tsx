import { Button, Card } from "antd";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegistered ? <LoginScreen /> : <RegisterScreen />}
        <Button onClick={() => setIsRegistered(!isRegistered)}>
          切换到{isRegistered ? "注册" : "登录"}
        </Button>
      </Card>
    </div>
  );
};
