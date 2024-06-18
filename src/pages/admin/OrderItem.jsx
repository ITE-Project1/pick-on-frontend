import React from "react";
import styled from "styled-components";

const OrderItem = ({ order }) => {
  return (
    <TableRow>
      <TableData>{order.pickupStatus === "배송중" && <input type="checkbox" />}</TableData>
      <TableData>{order.orderId}</TableData>
      <TableData>{order.quantity}</TableData>
      <TableData>{order.fromStore}</TableData>
      <TableData>{order.pickupStatus}</TableData>
    </TableRow>
  );
};

export default OrderItem;

const TableRow = styled.tr`
  // &:nth-child(even) {
  //   background-color: #f9f9f9;
  // }
`;

const TableData = styled.td`
  text-align: center;
`;
