import React, { useState, useEffect } from "react";
import styled from "styled-components";
import stock from "../../../assets/img/stock.png";
import stock_white from "../../../assets/img/stock_white.png";
import list from "../../../assets/img/list.png";
import list_white from "../../../assets/img/list_white.png";
import users from "../../../assets/img/users.png";
import users_white from "../../../assets/img/users_white.png";
import my from "../../../assets/img/my.png";
import my_white from "../../../assets/img/my_white.png";
import { ReactComponent as HomeIcon } from "../../../assets/svg/home.svg";
import { ReactComponent as HomeIconWhite } from "../../../assets/svg/home_white.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const [clickedIcon, setClickedIcon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setClickedIcon("stock");
    } else {
      setClickedIcon("home");
    }
  }, [location.pathname]);

  const handleIconClick = (iconName, path) => {
    setClickedIcon(iconName);
    navigate(path);
  };

  return (
    <FooterWrapper>
      {location.pathname.startsWith("/admin") ? (
        <>
          <IconWrapper
            onClick={() => handleIconClick("stock", "/admin/stock")}
            isClicked={clickedIcon === "stock"}
          >
            <img
              src={clickedIcon === "stock" ? stock_white : stock}
              alt="stock"
              width={40}
              height={37}
            />
            <IconText>재고목록</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={() => handleIconClick("list", "/admin/order")}
            isClicked={clickedIcon === "list"}
          >
            <img
              src={clickedIcon === "list" ? list_white : list}
              alt="list"
              width={45}
              height={24}
              style={{ marginTop: "7px" }}
            />
            <IconText>주문내역</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={() => handleIconClick("users", "/admin/users")}
            isClicked={clickedIcon === "users"}
          >
            <img
              src={clickedIcon === "users" ? users_white : users}
              alt="users"
              width={46}
              height={42}
            />
            <IconText>유저관리</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={() => handleIconClick("my", "/admin/my")}
            isClicked={clickedIcon === "my"}
          >
            <img src={clickedIcon === "my" ? my_white : my} alt="my" width={44} height={38} />
            <IconText>마이</IconText>
          </IconWrapper>
        </>
      ) : (
        <>
          <IconWrapper
            onClick={() => handleIconClick("home", "/user/productlist")}
            isClicked={clickedIcon === "home"}
          >
            {clickedIcon === "home" ? (
              <HomeIconWhite width={40} height={40} />
            ) : (
              <HomeIcon width={40} height={40} />
            )}
            <IconText>홈</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={() => handleIconClick("my", "/user/my")}
            isClicked={clickedIcon === "my"}
          >
            <img src={clickedIcon === "my" ? my_white : my} alt="my" width={44} height={38} />
            <IconText>마이</IconText>
          </IconWrapper>
        </>
      )}
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
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 64px;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) => (props.isClicked ? "#ffffff" : "#828282")};
`;

const IconText = styled.span`
  font-size: 15px;
  color: ${(props) => (props.isClicked ? "#ffffff" : "#828282")};
`;