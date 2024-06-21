import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import SearchWrapper from "../../components/common/SearchWrapper";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [storeId, setStoreId] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [keyword, storeId, pageNum]);

  const fetchOrders = async () => {
    try {
      axios
          .get(`http://localhost:8080/admin/orders?storeId=${storeId}&page=${pageNum}&keyword=${keyword}`, {withCredentials : true})
          .then((response) => {
            if (pageNum > 1) {
              setOrders((prevOrders) => [...prevOrders, ...response.data]);
            } else {
              setOrders(response.data);
            }
            setHasMoreOrders(response.data.length === 10);
          });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setOrders([]);
    setPageNum(1);
  };

  const handleStoreChange = (e) => {
    setStoreId(e.target.value);
    setOrders([]);
    setPageNum(1);
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  };

  const handleSelectOrder = (orderId, isSelected) => {
    setSelectedOrders((prevSelected) =>
        isSelected ? [...prevSelected, orderId] : prevSelected.filter((id) => id !== orderId)
    );
  };

  const handleCompleteDelivery = async () => {
    try {
      await axios.patch("http://localhost:8080/admin/orders/status/pickupready", selectedOrders, {withCredentials : true});
      alert("지점 수령 완료 상태로 변경되었습니다.");
      setSelectedOrders([]);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
      <Container>
        <Header>
          <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />
          <Controls>
            <Button onClick={handleCompleteDelivery}>지점 수령 완료</Button>
            <Select onChange={handleStoreChange} value={storeId}>
              <option value={1}>천호점</option>
              <option value={2}>목동점</option>
              <option value={3}>무역센터점</option>
              <option value={4}>더현대서울점</option>
              <option value={5}>압구정본점</option>
            </Select>
          </Controls>
        </Header>
        <OrderTableWrapper>
          <OrderTableHeader>
            <HeaderItem width="5%"></HeaderItem>
            <HeaderItem width="40%">주문코드</HeaderItem>
            <HeaderItem width="10%">수량</HeaderItem>
            <HeaderItem width="25%">발송 지점</HeaderItem>
            <HeaderItem width="20%">픽업 현황</HeaderItem>
          </OrderTableHeader>
          <OrderTableBody>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} onSelect={handleSelectOrder} />
            ))}
            <ButtonWrapper>
              {hasMoreOrders && (
                  <PlusButton onClick={handlePageChange}>
                    <PlusBtnSvg></PlusBtnSvg>
                  </PlusButton>
              )}
            </ButtonWrapper>
          </OrderTableBody>
        </OrderTableWrapper>
      </Container>
  );
};
export default OrderList;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  padding-top: 15px;
`;

const Button = styled.button`
  padding: 5px 15px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Select = styled.select`
  padding: 5px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const OrderTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 258px); /* Header와 Footer, Button을 제외한 높이 */
`;

const OrderTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ddd;
  padding: 20px 2px;
  font-size: 12px;
  font-weight: bold;
`;

const HeaderItem = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`;

const OrderTableBody = styled.div`
  overflow-y: auto;
  flex-grow: 1; /* flex-grow 속성을 사용하여 나머지 공간을 채우도록 설정 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
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
  transition:
    background-color 0.3s,
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
