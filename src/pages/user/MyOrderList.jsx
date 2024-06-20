import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import {ReactComponent as OrderProcess1} from "../../assets/svg/orderProcess1.svg";
import {ReactComponent as OrderProcess2} from "../../assets/svg/orderProcess2.svg";
import {ReactComponent as OrderProcess3} from "../../assets/svg/orderProcess3.svg";
import {ReactComponent as OrderProcess4} from "../../assets/svg/orderProcess4.svg";

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
    setPageNum(prevPageNum => prevPageNum + 1);
  };

  return (
    <Container>
      <Header>
        <TitleText>주문 및 픽업 조회</TitleText>
      </Header>
      <ProductListWrapper>
        <ProductList>
          {sampleOrders.map(order => (
            <Product key={order.orderId}>
              <ProductImage alt="Product image" src={order.productImageUrl}/>
              <StatusBar>
                {statusIcons[order.orderStatus]}
              </StatusBar>
              <ProductDetails>
                <ProductBrand>{order.brandName}</ProductBrand>
                <ProductTitle>링클 프리 반팔 크롭 나시</ProductTitle>
                <ProductPrice>14,100원</ProductPrice>
              </ProductDetails>
              <FirstLine>
                <OrderId>{order.orderId}</OrderId>
                <StoreInfo>{order.storeName} / {order.orderDate}</StoreInfo>
              </FirstLine>
            </Product>
          ))}
        </ProductList>
      </ProductListWrapper>
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
  font-size: 23px;
  padding: 15px 0px 20px 0px;
`;

const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 305px);
`;

const ProductList = styled.div`
  overflow-y: auto;
  flex-grow: 1; /* flex-grow 속성을 사용하여 나머지 공간을 채우도록 설정 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Product = styled.div`
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  height: 224px;
  width: 385px;
  margin-top: 20px;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 66px;
  left: 0;
  width: 74px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const StatusBar = styled.div`
  position: absolute;
  top: 171px;
  left: 3px;
  width: 382px;
  height: 36px;
`;

const ProductDetails = styled.div`
  position: absolute;
  top: 72px;
  left: 89px;
  width: 152px;
`;

const ProductTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #111111;
  line-height: 17px;
  margin-top: 6px;
`;

const ProductPrice = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #000;
  line-height: 17px;
  margin-top: 6px;
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

const sampleOrders = [
  {
    orderId: "PO_3020346273",
    orderStatus: 1,
    orderDate: "2024-06-17",
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "아르켓",
    storeName: "더현대서울점"
  },
  {
    orderId: "PO_3020346274",
    orderStatus: 2,
    orderDate: "2024-06-16",
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "자라",
    storeName: "롯데월드몰점"
  },
  {
    orderId: "PO_3020346275",
    orderStatus: 3,
    orderDate: "2024-06-15",
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "유니클로",
    storeName: "스타필드 코엑스몰점"
  },
  {
    orderId: "PO_3020346276",
    orderStatus: 4,
    orderDate: "2024-06-14",
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "무신사",
    storeName: "가로수길점"
  },
  {
    orderId: "PO_3020346277",
    orderStatus: 1,
    orderDate: "2024-06-13",
    productImageUrl: "https://image.thehyundai.com/static/5/3/3/33/A1/40A1333352_1_300.jpg",
    brandName: "나이키",
    storeName: "강남점"
  }
];