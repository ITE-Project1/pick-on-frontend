// 주문내역 페이지

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import { ReactComponent as SearchSvg } from "../../assets/svg/search.svg";
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
      <OrderTable>
        <thead>
          <tr>
            <th></th>
            <th>주문코드</th>
            <th>수량</th>
            <th>발송 지점</th>
            <th>픽업 현황</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </tbody>
      </OrderTable>
    </Container>
  );
};
export default Order;

const Container = styled.div`
  padding: 20px;
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

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 20px 2px;
    text-align: center;
  }

  th {
    font-size: 12px;
  }

  tr {
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s ease;
    font-size: 12px;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    vertical-align: middle;
  }

  thead tr {
    border-bottom: 2px solid #ddd;
  }
`;
