import React, {useEffect, useState} from "react";
import styled from "styled-components";

const UserItem = ({user, handleUserSelection, isSelected}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleUserSelection(user);
  };

  return (
    <TableRow>
      <TableData width="1%">{<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />}</TableData>
      <TableData width="40%">{user.username}</TableData>
      <TableData width="25%">{user.createdAt}</TableData>
      <TableData width="25%">{user.status === 0 ? '활성' : '비활성'}</TableData>
    </TableRow>
  );
};

export default UserItem;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
