import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const My = () => {
  const navigate = useNavigate(); 

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('http://localhost:8080/user/sign-out', {}, { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error("Account deletion failed");
      }
    } catch (error) {
      console.error("Account deletion error:", error);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Title>마이페이지</Title>
        <ButtonContainer>
          <Button type="button" onClick={handleLogout}>로그아웃</Button>
          <Button type="button" secondary onClick={handleDeleteAccount}>회원탈퇴</Button>
        </ButtonContainer>
      </LoginContainer>
    </Container>
  );
};
export default My;

const Container = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #ffffff;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-size: 20px;
  color: #000000;
  margin-top : 5rem;
  margin-bottom: 5rem; /* 마이페이지 텍스트를 아래로 이동시키기 위해 추가 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top : 4rem;
  width: 100%; /* 버튼들을 가로로 길게 만들기 위해 추가 */
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? "#ffffff" : "#000000")};
  color: ${({ secondary }) => (secondary ? "#000000" : "#ffffff")};
  font-family: 'Apple SD Gothic Neo', Helvetica;
  font-size: 15px;
  font-weight: 400;
  padding: 0.5rem;
  margin-top : 1rem;
  border: ${({ secondary }) => (secondary ? "1px solid #00000087" : "none")};
  border-radius: 3px;
  cursor: pointer;
  width: 100%; /* 버튼들을 가로로 길게 만들기 위해 추가 */

  &:hover {
    background-color: ${({ secondary }) => (secondary ? "#f0f0f0" : "#333333")};
  }
`;
