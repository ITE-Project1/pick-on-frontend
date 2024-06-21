import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const generateVirtualAccount = () => {
  const bankCode = Math.floor(Math.random() * 9000) + 1000; // 1000~9999 사이의 난수 생성
  const accountNumber = Math.floor(Math.random() * 900000000) + 100000000; // 100000000~999999999 사이의 난수 생성
  return `${bankCode}-${accountNumber}`;
};

const OrderModal = ({ isOpen, onRequestClose, orderResponse }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Order Response"
    >
      <ModalHeader>
        <Title>주문 상세</Title>
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <OrderDetail><Label>주문번호:</Label> {orderResponse.orderId}</OrderDetail>
        <OrderDetail><Label>주문일:</Label> {orderResponse.orderDate}</OrderDetail>
        <OrderDetail><Label>픽업 예상 날짜:</Label> {orderResponse.pickupDate}</OrderDetail>
        <OrderDetail><Label>지점명:</Label> {orderResponse.toStore}</OrderDetail>
        <OrderDetail><Label>상품명:</Label> {orderResponse.productName}</OrderDetail>
        <OrderDetail><Label>수량:</Label> {orderResponse.quantity}</OrderDetail>
        <OrderDetail><Label>총 가격:</Label> {orderResponse.totalPrice?.toLocaleString()}원</OrderDetail>
        <OrderDetail><Label>가상계좌번호:</Label> {generateVirtualAccount()}</OrderDetail>
      </ModalBody>
      <ModalFooter>
        <ConfirmButton onClick={onRequestClose}>확인</ConfirmButton>
      </ModalFooter>
    </Modal>
  );
};

export default OrderModal;

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
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
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
