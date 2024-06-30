import React, { useEffect, useState } from "react";
import axios from "../../auth/axiosConfig";
import styled from "styled-components";
import SearchWrapper from "../../components/common/SearchWrapper";
import UserItem from "./UserItem";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageNum, setPageNum] = useState('0');
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/users?page=${pageNum}&keyword=${keyword}`, {withCredentials : true}
      );
      if(pageNum > 0) {
        setUsers(prevUsers => [...prevUsers, ...response.data.list]);
      } else {
        setUsers(response.data.list);
      }
      setHasMoreUsers(pageNum < response.data.totalPage - 1); // 10개씩 가져오는 것으로 가정
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, pageNum]);

  const handleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUpdateUserStatus = async () => {
    try {
      await axios.patch(`http://localhost:8080/admin/users`, selectedUsers.map(user => user.username), {withCredentials : true});
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPageNum(0);
    updateUsers();
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  }

  const updateUsers = () => {
    setUsers([]);
  };

  return (
    <Container>
      <Header>
        <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />
        <Controls>
          <Button onClick={handleUpdateUserStatus}>유저 상태 변경</Button>
        </Controls>
      </Header>
      <OrderTableWrapper>
        <OrderTableHeader>
          <HeaderItem width="1%"></HeaderItem>
          <HeaderItem width="40%">유저 ID</HeaderItem>
          <HeaderItem width="25%">가입일</HeaderItem>
          <HeaderItem width="25%">유저 상태</HeaderItem>
        </OrderTableHeader>
        <OrderTableBody>
          {users.map((user) => (
            <UserItem key={user.id}
                      user={user}
                      handleUserSelection={handleUserSelection}
                      isSelected={selectedUsers.includes(user)}/>
          ))}
          <ButtonWrapper>
            {hasMoreUsers && (
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
export default UserList;

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

const OrderTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 268px);
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
  justify-content: center; /* 버튼을 중앙에 배치 */
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
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
