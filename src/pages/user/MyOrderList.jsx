import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import {ReactComponent as OrderProcess1} from "../../assets/svg/orderProcess1.svg";
import {ReactComponent as OrderProcess2} from "../../assets/svg/orderProcess2.svg";
import {ReactComponent as OrderProcess3} from "../../assets/svg/orderProcess3.svg";
import {ReactComponent as OrderProcess4} from "../../assets/svg/orderProcess4.svg";
import {ReactComponent as PlusBtnSvg} from "../../assets/img/plusButton.svg";

const statusIcons = {
  1: <OrderProcess1/>,
  2: <OrderProcess2/>,
  3: <OrderProcess3/>,
  4: <OrderProcess4/>,
};

function MyOrderList() {
  const [orders, setOrders] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `http://localhost:8080/orders?page=${pageNum}`;
        const response = await axios.get(url, {withCredentials : true}));
        console.log("생성된 URL:", url);
        if (pageNum > 0) {
          setOrders(prevProducts => [...prevProducts, ...response.data.list]);
        } else {
          setOrders(response.data.list);
        }

        setHasMoreOrders(pageNum < response.data.totalPage - 1);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [pageNum]);

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}.${month}.${day}`;
  };

  return (
    <Container>
      <Header>
        <TitleText>주문 및 픽업 조회</TitleText>
      </Header>
      <Underbar></Underbar>
      <ContentWrapper>
        <ProductList>
          {orders.map(order => (
            <Product key={order.orderId}>
              <PickUp>
                <PickUpDateText>
                  픽업 예상 날짜
                </PickUpDateText>
                <PickUpDate>
                  {formatDate(order.pickupDate)}
                </PickUpDate>
              </PickUp>
              <FirstLine>
                <OrderId>{order.orderId}</OrderId>
                <StoreInfo>{order.storeName} / {formatDate(order.orderDate)}</StoreInfo>
              </FirstLine>
              <ProductContent>
                <ProductImage alt="Product image" src={order.productImg}/>
                <ProductDetails>
                  <ProductBrand>{order.brandName}</ProductBrand>
                  <ProductTitle>{order.productName}</ProductTitle>
                  <ProductPrice>{formatPrice(order.totalPrice)}원</ProductPrice>
                </ProductDetails>
              </ProductContent>
              <StatusBar>
                {statusIcons[order.pickupStatus]}
              </StatusBar>
            </Product>
          ))}
          <ButtonWrapper>
            {hasMoreOrders && (
              <PlusButton onClick={handlePageChange}>
                <PlusBtnSvg></PlusBtnSvg>
              </PlusButton>
            )}
          </ButtonWrapper>
        </ProductList>
      </ContentWrapper>
    </Container>
  );
}

export default MyOrderList;

const Container = styled.div`
`;

const Header = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  background-color: #fff;
`;

const Underbar = styled.div`
  width: inherit;
  height: 12px;
  max-width: 425px;
  position: fixed;
  margin: 0 auto;
  top: 60px; /* 헤더 높이만큼 아래에 위치 */
  left: 0;
  right: 0;
  z-index: 9; /* 헤더보다 뒤에 있도록 설정 */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); /* 아래로 갈수록 연한 회색 */
`;

const TitleText = styled.div`
  font-size: 20px;
  padding: 15px 0px 15px 0px;
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
  background-color: #828282;
`;

const ProductList = styled.div`
  background-color: #F0F0F0;
  height: calc(100vh - 118px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  position: relative;
  height: 270px;
  width: auto;
  margin-bottom: 10px;
`;

const PickUp = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`;

const PickUpDateText = styled.div`
  color: #969696;
  font-size: 12px;
  margin-right: 5px;
`;

const PickUpDate = styled.div`
  color: #000000;
  font-weight: 700;
  font-size: 17px;
`;

const FirstLine = styled.div`
  margin-left: 20px;
  display: flex;
  text-align: end;
  justify-content: space-between;
  margin-top: 10px;
  width: 377px;
  height: 29px;
`;

const ProductContent = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: left;
  flex-direction: row;
`;

const ProductImage = styled.img`
  top: 66px;
  left: 0;
  width: 74px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const StatusBar = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: 382px;
  height: 36px;
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  margin-top: 5px;
  margin-left: 15px;
  top: 72px;
  left: 89px;
  width: 300px;
`;

const ProductTitle = styled.p`
  font-size: 15px;
  font-weight: 650;
  color: #111111;
  line-height: 17px;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 두 줄로 제한 */
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-top: 7px;
`;

const ProductBrand = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #969696;
  line-height: 17px;
`;

const OrderId = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #46675c;
`;

const StoreInfo = styled.div`
  margin-top: 1px;
  left: 230px;
  font-size: 13px;
  font-weight: 600;
  color: #969696;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 중앙에 배치 */
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PlusButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s,
  transform 0.3s;

  svg {
    width: 100px; /* SVG의 너비 설정 */
    height: 40px; /* SVG의 높이 설정 */
    fill: #828282;
    transition: fill 0.3s;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }
`;

