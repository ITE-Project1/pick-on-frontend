import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchSvg } from "../../assets/svg/search.svg";

const SearchWrapper = ({ keyword, handleSearchChange }) => {
  return (
    <Wrapper>
      <SearchIcon>
        <SearchSvg />
      </SearchIcon>
      <SearchInput 
        type="text" 
        placeholder="Search" 
        value={keyword} 
        onChange={handleSearchChange} 
      />
    </Wrapper>
  );
};

export default SearchWrapper;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #ccc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px 10px 40px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 16px;
`;