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
  const [pageNum, setPageNum] = useState('0');
  const [hasMoreOrders, setHasMoreOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `http://localhost:8080/users/orders/list?page=${pageNum}`
        const response = await axios.get(url);
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

  return (
    <Container>
      <Header>
        <TitleText>주문 및 픽업 조회</TitleText>
      </Header>
      <ProductList>
        {sampleOrders.map(order => (
          <Product key={order.orderId}>
            <FirstLine>
              <OrderId>{order.orderId}</OrderId>
              <StoreInfo>{order.storeName} / {order.orderDate}</StoreInfo>
            </FirstLine>
            <ProductContent>
              <ProductImage alt="Product image" src={order.productImageUrl}/>
              <ProductDetails>
                <ProductBrand>{order.brandName}</ProductBrand>
                <ProductTitle>{order.productName}</ProductTitle>
                <ProductPrice>{formatPrice(order.productPrice)}원</ProductPrice>
              </ProductDetails>
            </ProductContent>
            <StatusBar>
              {statusIcons[order.orderStatus]}
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
    </Container>
  );
}

export default MyOrderList;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
`;

const TitleText = styled.div`
  font-size: 20px;
  padding: 15px 0px 15px 0px;
`;


const ProductList = styled.div`
  height: calc(100vh - 228px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Product = styled.div`
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  height: 224px;
  width: 385px;
  margin-top: 20px;
`;

const ProductContent = styled.div`
  display: flex;
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
  margin-top: 30px;
  width: 382px;
  height: 36px;
`;

const ProductDetails = styled.div`
  margin-top: 5px;
  margin-left: 15px;
  top: 72px;
  left: 89px;
  width: 152px;
`;

const ProductTitle = styled.p`
  font-size: 15px;
  font-weight: 650;
  color: #111111;
  line-height: 17px;
  margin-top: 6px;
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

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  width: 377px;
  height: 29px;
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
  background-color: white;
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

const sampleOrders = [
  {
    orderId: "PO_3020346273",
    orderStatus: 1,
    orderDate: "2024-06-17",
    productName: "링클 프리 반팔 크롭 나시",
    productPrice: 14000,
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "아르켓",
    storeName: "더현대서울점"
  },
  {
    orderId: "PO_3020346274",
    orderStatus: 2,
    orderDate: "2024-06-16",
    productName: "링클 프리 반팔 크롭 나시",
    productPrice: 14000,
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "자라",
    storeName: "롯데월드몰점"
  },
  {
    orderId: "PO_3020346275",
    orderStatus: 3,
    orderDate: "2024-06-15",
    productName: "링클 프리 반팔 크롭 나시",
    productPrice: 14000,
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "유니클로",
    storeName: "스타필드 코엑스몰점"
  },
  {
    orderId: "PO_3020346276",
    orderStatus: 4,
    orderDate: "2024-06-14",
    productName: "링클 프리 반팔 크롭 나시",
    productPrice: 14000,
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "무신사",
    storeName: "가로수길점"
  },
  {
    orderId: "PO_3020346277",
    orderStatus: 1,
    orderDate: "2024-06-13",
    productName: "링클 프리 반팔 크롭 나시",
    productPrice: 14000,
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "나이키",
    storeName: "강남점"
  }
];

