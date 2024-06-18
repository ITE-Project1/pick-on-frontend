import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import SearchWrapper from "../../components/common/SearchWrapper";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [storeId, setStoreId] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/orders?storeId=${storeId}&page=1&keyword=${keyword}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [keyword, storeId]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleStoreChange = (e) => {
    setStoreId(e.target.value);
  };

  return (
    <Container>
      <Header>
        <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />

        <Controls>
          <Button>지점 수령 완료</Button>
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
          <HeaderItem width="1%"></HeaderItem>
          <HeaderItem width="40%">주문코드</HeaderItem>
          <HeaderItem width="9%">수량</HeaderItem>
          <HeaderItem width="25%">발송 지점</HeaderItem>
          <HeaderItem width="25%">픽업 현황</HeaderItem>
        </OrderTableHeader>
        <OrderTableBody>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </OrderTableBody>
      </OrderTableWrapper>
    </Container>
  );
};
export default Order;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: calc(100vh - 189px); /* Header와 Footer를 제외한 높이 */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
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
  height: 100%;
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
  flex: ${(props) => props.width};
  text-align: center;
`;

const OrderTableBody = styled.div`
  overflow-y: auto;
  height: calc(100vh - 325px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

