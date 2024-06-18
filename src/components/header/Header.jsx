// 헤더 로고
import styled from "styled-components";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <HeaderWrapper>
      <img src={logo} height={39} width={145} alt="logo" />
    </HeaderWrapper>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  width: inherit;
  height: 87px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 425px;
  margin: 0 auto;

  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;
