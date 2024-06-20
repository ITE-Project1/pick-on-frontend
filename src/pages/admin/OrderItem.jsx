import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ order, onSelect}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/admin/order/${order.orderId}`);
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        onSelect(order.orderId, e.target.checked);
    };

    const handleCheckboxClick = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
    };

    return (
        <TableRow onClick={handleClick}>
            <TableData width="5%">
                {order.pickupStatus === "배송중" && (
                    <input type="checkbox" onChange={handleCheckboxChange} onClick={handleCheckboxClick} />
                )}
            </TableData>
            <TableData width="40%">{order.orderId}</TableData>
            <TableData width="10%">{order.quantity}</TableData>
            <TableData width="25%">{order.fromStore}</TableData>
            <TableData width="20%">{order.pickupStatus}</TableData>
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
