import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/order/${order.orderId}`);
  };

  return (
    <TableRow onClick={handleClick}>
      <TableData width="1%">{order.pickupStatus === "배송중" && <input type="checkbox" />}</TableData>
      <TableData width="40%">{order.orderId}</TableData>
      <TableData width="9%">{order.quantity}</TableData>
      <TableData width="25%">{order.fromStore}</TableData>
      <TableData width="25%">{order.pickupStatus}</TableData>
    </TableRow>
  );
};

export default OrderItem;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 2px;
  font-size: 12px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`;
