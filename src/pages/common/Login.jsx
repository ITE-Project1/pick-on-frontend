import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate를 함수로 호출합니다.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", { username, password });
      const { role } = response.data;
      if (role === "admin") {
        navigate("/admin/stocklist");
      } else {
        navigate("/user/productlist");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
      <Container>
        <LoginContainer>
          <Title>로그인</Title>
          <LoginForm onSubmit={handleSubmit}>
            <InputContainer>
              <InputField>
                <Label htmlFor="username">아이디</Label>
                <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </InputField>
              <InputField>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </InputField>
            </InputContainer>
            <OptionsContainer>
              <RememberMe>
                <Label htmlFor="remember">
                  아이디 저장하기
                  <Checkbox id="remember" type="checkbox" />
                </Label>
              </RememberMe>
              <HelpText>아이디 찾기 | 비밀번호 찾기</HelpText>
            </OptionsContainer>
            <AgreementText>
              로그인 시, 귀하는 픽ON의 의 약관 및 조건에 동의하게 됩니다.
            </AgreementText>
            <ButtonContainer>
              <Button type="submit">로그인</Button>
              <Button type="button" secondary onClick={handleSignup}>회원가입</Button>
            </ButtonContainer>
          </LoginForm>
        </LoginContainer>
      </Container>
  );
};
export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #ffffff;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0rem; /* 로그인 폼을 조금 아래로 이동시키기 위해 추가 */
`;

const Title = styled.h1`
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-size: 20px;
  margin-bottom: 1rem;
  color: #000000;
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const InputField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #828282;
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 12px;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  outline: none;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

const HelpText = styled.p`
  color: #828282;
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 12px;
  cursor: pointer;
`;

const AgreementText = styled.p`
  color: #8d8d8d;
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 12px;
  margin-top : 1rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Apple SD Gothic Neo', sans-serif
  font-size : 11px;
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? "#ffffff" : "#000000")};
  color: ${({ secondary }) => (secondary ? "#000000" : "#ffffff")};
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 15px;
  font-weight: 400;
  padding: 0.5rem;
  border: ${({ secondary }) => (secondary ? "1px solid #00000087" : "none")};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ secondary }) => (secondary ? "#f0f0f0" : "#333333")};
  }
`;