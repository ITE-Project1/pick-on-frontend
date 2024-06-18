import React, { useEffect, useState } from "react";
import "../../components/styled/ProductList.css";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as SearchSvg } from "../../assets/svg/search.svg";


// 정렬 옵션 컴포넌트
function Sortby({ setSort, selectedSort }) {
  return (
    <div className="sort-by">
      <SortOption 
        isSelected={selectedSort === 'created_at'} 
        onClick={() => setSort('created_at')}
      >
        최신순
      </SortOption>
      <SortOption 
        isSelected={selectedSort === 'priceLow'} 
        onClick={() => setSort('priceLow')}
      >
        낮은 가격순
      </SortOption>
      <SortOption 
        isSelected={selectedSort === 'priceHigh'} 
        onClick={() => setSort('priceHigh')}
      >
        높은 가격순
      </SortOption>
    </div>
  );
}


// 상품 카드 컴포넌트
function ProductCard({ product }) {
  return (
    <Card>
      <ImageWrapper>
        <Image src={product.imageUrl} alt={product.name} />
      </ImageWrapper>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
    </Card>
  );
}

// 상품 목록 컴포넌트
export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState('created_at');

  useEffect(() => {
    fetchProducts();
  }, [sort, keyword]);

  const fetchProducts = async () => {
    const url = `http://localhost:8080/products/list?page=1&sort=${sort}&keyword=${keyword}`;
    console.log("생성된 URL:", url);
    try {
      const response = await axios.get(url);
      console.log("Response data:", JSON.stringify(response.data, null, 2));
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Container>
      <Header>
        <SearchWrapper>
          <SearchIcon>
            <SearchSvg />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search" 
            value={keyword} 
            onChange={handleSearchChange} 
          />
        </SearchWrapper>
      </Header>

      <SortbyWrapper>
      <Sortby setSort={setSort} selectedSort={sort} />
      </SortbyWrapper>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;

// 스타일 컴포넌트 정의


const SortOption = styled.span`
  padding: 0 20px;
  cursor: pointer;
  font-size : 12px;
  color: ${props => (props.isSelected ? "#46675C " : "#828282")}; // 선택된 항목의 색깔 변경
  font-weight: ${props => (props.isSelected ? "bold" : "normal")}; // 선택된 항목의 글자 두껍게

  &:hover {
    text-decoration: underline;
  }
`;
const SortbyWrapper = styled.div`
  // align-self: flex-end;
  margin-left: 50px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 20px); /* 2개씩 가로로 배치 */
  box-sizing: border-box;
  padding: 10px;
  text-align: center;

  border-radius: 10px;
  max-width: calc(50% - 20px); /* 2개씩 가로로 배치 */
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border : 0.5px solid #f0f0f0; 
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain; 

`;
// const ProductName = styled.div`
//   margin-top: 10px;
//   font-size: 14px;
//   color: #828282;
//   text-align: left;
//   white-space: pre-line; /* allow for line breaks */
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 2; /* 두 줄 허용 */
//   -webkit-box-orient: vertical;
// `;
const ProductName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #828282;
  text-align: left;
  height: 40px; /* 두 줄의 높이를 확보 */
  line-height: 20px; /* 줄 높이를 설정 */
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: right;
`;
