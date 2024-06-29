import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../auth/axiosConfig";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/register", { name, username, password, phone_number });
      alert('회원가입 완료! 다시 로그인해주세요');
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data); // 서버에서 받은 에러 메시지를 상태에 저장
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
      <Container>
        <RegisterContainer>
          <Title>회원가입</Title>
          <RegisterForm onSubmit={handleSubmit}>
            <InputContainer>
              <InputField>
                <Input
                    id="name"
                    type="text"
                    placeholder="이름 입력"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </InputField>
              <InputField>
                <Input
                    id="username"
                    type="text"
                    placeholder="아이디 입력"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </InputField>
              <InputField>
                <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              </InputField>
              <InputField>
                <Input
                    id="phone_number"
                    type="text"
                    placeholder="전화번호 입력"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                />
                {errors.phone_number && <ErrorMessage>{errors.phone_number}</ErrorMessage>}
              </InputField>
            </InputContainer>
            <MemberCheck>
              이미 회원이신가요? <a href="/login">로그인하기</a>
            </MemberCheck>
            <ButtonContainer>
              <Button type="submit">회원가입</Button>
            </ButtonContainer>
          </RegisterForm>
        </RegisterContainer>
      </Container>
  );
};
export default Register;

const Container = styled.div`
  display: block;  /* 수정: block에서 flex로 변경 */
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #ffffff;
`;

const RegisterContainer = styled.div`
  background-color: #ffffff;
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0rem;
`;

const Title = styled.h1`
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-size: 20px;
  color: #000000;
  margin-bottom: 3rem;
`;

const RegisterForm = styled.form`
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 0.5rem;
`;

const MemberCheck = styled.p`
  color: #8d8d8d;
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 12px;
  margin-bottom: 2rem;
  text-align:center;

  a {
    color: #8d8d8d;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-size : 11px;
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? "#ffffff" : "#000000")};
  color: ${({ secondary }) => (secondary ? "#000000" : "#ffffff")};
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 15px;
  font-weight: 400;
  padding: 0.7rem;
  border: ${({ secondary }) => (secondary ? "1px solid #00000087" : "none")};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ secondary }) => (secondary ? "#f0f0f0" : "#333333")};
  }
`;
