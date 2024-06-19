import React, { useEffect, useState } from "react";
import "../../components/styled/ProductList.css";
import axios from "axios";
import styled from "styled-components";
import SearchWrapper from "../../components/common/SearchWrapper";
import { ReactComponent as SearchSvg } from "../../assets/svg/search.svg";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";


// 정렬 옵션 컴포넌트
function Sortby({ setSort, selectedSort, setPageNum }) {
  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPageNum(1);  // 페이지 번호를 1로 초기화
  };

  return (
    <div className="sort-by">
      <SortOption 
        isSelected={selectedSort === 'created_at'} 
        onClick={() => handleSortChange('created_at')}
      >
        최신순
      </SortOption>
      <SortOption 
        isSelected={selectedSort === 'priceLow'} 
        onClick={() => handleSortChange('priceLow')}
      >
        낮은 가격순
      </SortOption>
      <SortOption 
        isSelected={selectedSort === 'priceHigh'} 
        onClick={() => handleSortChange('priceHigh')}
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
  const [pageNum, setPageNum] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => { //state 변경시 다시 실행된다
    fetchProducts();
  }, [pageNum, sort, keyword]);

  const fetchProducts = async () => {
    console.log("pageNum:",pageNum);
    const url = `http://localhost:8080/products/list?page=${pageNum}&sort=${sort}&keyword=${keyword}`;
    console.log("생성된 URL:", url);
    try {
      const response = await axios.get(url);
      console.log("Response data:", JSON.stringify(response.data, null, 2));
      if(pageNum > 1) {
        setProducts(prevProducts => [...prevProducts, ...response.data]);
      } else {
        setProducts(response.data);
      }
      setHasMoreProducts(response.data.length === 10); // 10개씩 가져오는 것으로 가정
    
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  }

  return (
    <Container>
      <Header>
        <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />
        <SortbyWrapper>
          <Sortby setSort={setSort} selectedSort={sort} setPageNum={setPageNum}/>
        </SortbyWrapper>
      </Header>
      <ProductWrapper>
        <ProductBody>
          <ProductGrid>
            {products.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </ProductGrid>
          <ButtonWrapper>
            {hasMoreProducts && (
              <PlusButton onClick={handlePageChange}>
                <PlusBtnSvg></PlusBtnSvg>
              </PlusButton>
            )}
          </ButtonWrapper>
        </ProductBody>
      </ProductWrapper>
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
  margin-top : 20px;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;


// const Header = styled.div`
//   border : 2px solid green;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 10px;
// `;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const SearchInput = styled.input`
  width: 100%;  /* 부모 요소의 너비를 100%로 설정 */
  padding: 10px 20px 10px 40px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 16px;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #ccc;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 246px); //브라우저 창의 전체 높이(100vh)에서 246픽셀을 뺀 값
`
const ProductBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; //세로 gap
  justify-content: space-between; //card 사이에 space 넣기
  width: 100%;  /* 중앙 정렬을 위해 부모 요소의 너비를 채움 */

`;

const Card = styled.div`
  flex: 1 1 calc(200% - 20px);
  box-sizing: border-box;
  text-align: center;

  border-radius: 10px;
  max-width: calc(47% ); /* 2개씩 가로로 배치, 부피조정  */ 
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



//더보기 버튼
const PlusButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 중앙에 배치 */
  width: 100%;
  margin-top: 20px;
`;

