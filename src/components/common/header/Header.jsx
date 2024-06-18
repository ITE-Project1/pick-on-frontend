// 헤더 로고
import styled from "styled-components";
import logo from "../../../assets/img/logo.png";

const Header = () => {
  return (
    <LogoContainer>
      <img src={logo} height={39} width={145} alt="logo" />
    </LogoContainer>
  );
};
export default Header;

const LogoContainer = styled.div`
  margin: 40px 0px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
