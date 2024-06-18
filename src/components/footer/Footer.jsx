import React, { useState, useEffect } from "react";
import styled from "styled-components";
import stock from "../../assets/img/stock.png";
import stock_white from "../../assets/img/stock_white.png";
import list from "../../assets/img/list.png";
import list_white from "../../assets/img/list_white.png";
import users from "../../assets/img/users.png";
import users_white from "../../assets/img/users_white.png";
import my from "../../assets/img/my.png";
import my_white from "../../assets/img/my_white.png";
import { useNavigate } from "react-router-dom";

// TODO: 유저용 푸터 (홈, 마이) (로그인 상태에 따른 처리)
// TODO: /admin이면 디폴트로 재고목록으로 설정, 그 외에는 디폴트로 홈으로 설정 (useLocation 이용)
// TODO: 글자 호버처리시 색깔변경 빼버리고 클릭시 색깔변경으로 하기
const Footer = () => {
  // const [isStockClicked, setIsStockClicked] = useState(false);
  // const [isListClicked, setIsListClicked] = useState(false);
  // const [isUserClicked, setIsUserClicked] = useState(false);
  // const [isMyClicked, setIsMyClicked] = useState(false);
  const [clickedIcon, setClickedIcon] = useState("stock");

  const navigate = useNavigate();

  const stockClick = () => {
    setClickedIcon("stock");
    navigate("/admin");
  };
  const listClick = () => {
    setClickedIcon("list");
    navigate("/admin/order");
  };
  const usersClick = () => {
    setClickedIcon("users");
    navigate("/admin/users");
  };
  const myClick = () => {
    setClickedIcon("my");
    navigate("/admin/my");
  };

  return (
    <FooterWrapper>
      <IconWrapper
        // onMouseOver={() => setIsStockClicked(true)}
        // onMouseOut={() => setIsStockClicked(false)}
        onClick={stockClick}
        isClicked={clickedIcon === "stock"}
      >
        <img src={clickedIcon === "stock" ? stock_white : stock} alt="stock" width={36} height={34} />
        <IconText>재고목록</IconText>
      </IconWrapper>

      <IconWrapper
        // onMouseOver={() => setIsListClicked(true)}
        // onMouseOut={() => setIsListClicked(false)}
        onClick={listClick}
        isClicked={clickedIcon === "list"}
      >
        <img
          src={clickedIcon === "list" ? list_white : list}
          alt="list"
          width={40}
          height={22}
          style={{ marginTop: "7px" }}
        />
        <IconText>주문내역</IconText>
      </IconWrapper>

      <IconWrapper
        // onMouseOver={() => setIsUserClicked(true)}
        // onMouseOut={() => setIsUserClicked(false)}
        onClick={usersClick}
        isClicked={clickedIcon === "users"}
      >
        <img src={clickedIcon === "users" ? users_white : users} alt="users" width={42} height={37} />
        <IconText>유저관리</IconText>
      </IconWrapper>

      <IconWrapper
        // onMouseOver={() => setIsMyClicked(true)}
        // onMouseOut={() => setIsMyClicked(false)}
        onClick={myClick}
        isClicked={clickedIcon === "my"}
      >
        {/* TODO: my_logo black과 white 크기가 다름. 이미지 교환 필요함 */}
        <img src={clickedIcon === "my" ? my_white : my} alt="my" width={36} height={36} />
        <IconText>마이</IconText>
      </IconWrapper>
    </FooterWrapper>
  );
};
export default Footer;

const FooterWrapper = styled.div`
  width: inherit;
  height: 87px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 425px;
  margin: 0 auto;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000000;
  z-index: 10;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 64px;
  justify-content: space-between;
  cursor: pointer;
  color: #828282;

  // &:hover {
  //   color: #f0f0f0;
  // }
  color: ${(props) => (props.isClicked ? "#ffffff" : "#828282")};
`;

const IconText = styled.span`
  font-size: 15px;
`;
