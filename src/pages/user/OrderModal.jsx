import React, {useState} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const OrderModal = ({ isOpen, onRequestClose, orderResponse }) => {
  const [redirect, setRedirect] = useState(false);

  const handleClose = () => {
    setRedirect(true);
    onRequestClose();
  };

  if (redirect) {
    return <Navigate to="/user/orderlist" />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Order Response"
    >
      <ModalHeader>
        <Title>주문이 완료되었습니다</Title>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <OrderDetail><Label>주문번호</Label> <Detail>{orderResponse.orderId}</Detail></OrderDetail>
        <OrderDetail><Label>주문일</Label> <Detail>{orderResponse.orderDate}</Detail></OrderDetail>
        <OrderDetail><Label>픽업 예상 날짜</Label> <Detail>{orderResponse.pickupDate}</Detail></OrderDetail>
        <OrderDetail><Label>픽업 지점</Label> <Detail>{orderResponse.toStore}</Detail></OrderDetail>
        <OrderDetail><Label>상품명</Label> <Detail>{orderResponse.productName}</Detail></OrderDetail>
        <OrderDetail><Label>수량</Label> <Detail>{orderResponse.quantity}</Detail></OrderDetail>
        <OrderDetail><Label>총 가격</Label> <Detail>{orderResponse.totalPrice?.toLocaleString()}원</Detail></OrderDetail>
        <OrderDetail><Label>가상계좌번호</Label> <Detail>{generateVirtualAccount()}</Detail></OrderDetail>
      </ModalBody>
      <ModalFooter>
        <ConfirmButton onClick={handleClose}>확인</ConfirmButton>
      </ModalFooter>
    </Modal>
  );
};

export default OrderModal;

const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    top: "0",
    left: "0",
  },
  content: {
    width: '400px',
    zIndex: "150",
    top: "50%",
    left: "50%",
    bottom: 'auto',
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

const generateVirtualAccount = () => {
  const bankCode = Math.floor(Math.random() * 9000) + 1000; // 1000~9999 사이의 난수 생성
  const accountNumber = Math.floor(Math.random() * 900000000) + 100000000; // 100000000~999999999 사이의 난수 생성
  return `${bankCode}-${accountNumber}`;
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const OrderDetail = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #444;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Detail = styled.span`
  color: #666;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #46675C;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #364e3d;
  }
`;
