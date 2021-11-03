import { Button, Card, Divider } from "antd";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <Container>
      <Header />
      <BackGround />
      <ShadowCard>
        <Title>{isRegistered ? "请登录" : "请注册"}</Title>
        {isRegistered ? <LoginScreen /> : <RegisterScreen />}
        <Divider />
        <a onClick={() => setIsRegistered(!isRegistered)}>
          {isRegistered ? "没有账号？立即注册" : "已有账号？立即登录"}
        </a>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: gray;
`;

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(
      ((100vh - 40rem) / 2 -3.2rem),
      calc((100vh - 40rem) / 2 -3.2rem)
    ),
    cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  /* 一个值，即指定图片的宽度 */
  background-size: 8rem;
  padding: 5rem 0;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
