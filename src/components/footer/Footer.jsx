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
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as HomeIconWhite } from "../../assets/svg/home_white.svg";
import { useNavigate , useLocation} from "react-router-dom";

const Footer = () => {
  const [clickedIcon, setClickedIcon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin/products")) {
      setClickedIcon("stock");
    } else if (location.pathname.startsWith("/admin/order")) {
      setClickedIcon("list");
    } else if (location.pathname.startsWith("/admin/users")) {
      setClickedIcon("users");
    } else if (location.pathname.startsWith("/admin/my") || location.pathname.startsWith("/user/my")) {
      setClickedIcon("my");
    } else if (location.pathname.startsWith("/user/productlist")) {
      setClickedIcon("home");
    }
  }, [location.pathname]);

  const stockClick = () => {
    setClickedIcon("stock");
    navigate("/admin/products");
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
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/my");
    } else {
      navigate("/user/my");
    }
  };
  const homeClick = () => {
    setClickedIcon("home");
    navigate("/user/productlist");
  };

  return (
    <FooterWrapper>
      {location.pathname.startsWith("/admin") ? (
        <>
          <IconWrapper
            onClick={stockClick}
            isClicked={clickedIcon === "stock"}
          >
            <img
              src={clickedIcon === "stock" ? stock_white : stock}
              alt="stock"
              width={31}
              height={29}
            />
            <IconText>재고목록</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={listClick}
            isClicked={clickedIcon === "list"}
          >
            <img
              src={clickedIcon === "list" ? list_white : list}
              alt="list"
              width={35}
              height={19}
              style={{ marginTop: "7px" }}
            />
            <IconText>주문내역</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={usersClick}
            isClicked={clickedIcon === "users"}
          >
            <img
              src={clickedIcon === "users" ? users_white : users}
              alt="users"
              width={36}
              height={32}
            />
            <IconText>유저관리</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={myClick}
            isClicked={clickedIcon === "my"}
          >
            <img src={clickedIcon === "my" ? my_white : my} alt="my" width={28} height={28} />
            <IconText>마이</IconText>
          </IconWrapper>
        </>
      ) : (
        <>
          <IconWrapper
            onClick={homeClick}
            isClicked={clickedIcon === "home"}
          >
            {clickedIcon === "home" ? (
              <HomeIconWhite width={30} height={30} />
            ) : (
              <HomeIcon width={30} height={30} />
            )}
            <IconText>홈</IconText>
          </IconWrapper>
          <IconWrapper
            onClick={myClick}
            isClicked={clickedIcon === "my"}
          >
            <img src={clickedIcon === "my" ? my_white : my} alt="my" width={28} height={28} />
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
  height: 67px;
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
  height: 48px;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) => (props.isClicked ? "#ffffff" : "#828282")};
`;

const IconText = styled.span`
  font-size: 13px;
`;
