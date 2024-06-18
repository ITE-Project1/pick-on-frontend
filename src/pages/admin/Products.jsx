import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import { ReactComponent as SearchSvg } from "../../assets/img/search.svg";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";

function Products() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [keyword, setKeyword] = useState('');
  const [storeId, setStoreId] = useState('1');
  const [pageNum, setPageNum] = useState('0');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/products?storeId=${storeId}&page=${pageNum}&sort=${sort}&keyword=${keyword}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [storeId, pageNum, sort, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleStoreChange = (e) => {
    setPageNum(0);
    setStoreId(e.target.value);
  };

  const handleSortChange = (sortKeyword) => {
    setPageNum(0);
    setSort(sortKeyword);
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  }

  return (
    <Container>
      <Header>
        <SearchWrapper>
          <SearchIcon>
            <SearchSvg />
          </SearchIcon>
          <SearchInput type="text" placeholder="Search" value={keyword} onChange={handleSearchChange} />
        </SearchWrapper>
        <Controls>
          <Select onChange={handleStoreChange} value={storeId}>
            <option value={1}>천호점</option>
            <option value={2}>목동점</option>
            <option value={3}>무역센터점</option>
            <option value={4}>더현대서울점</option>
            <option value={5}>압구정본점</option>
          </Select>
        </Controls>
        <SortWrapper>
          <SortKeywords onClick={() => handleSortChange("")}>최신순</SortKeywords>
          <SortKeywords onClick={() => handleSortChange("priceLow")}>낮은 가격순</SortKeywords>
          <SortKeywords onClick={() => handleSortChange("priceHigh")}>높은 가격순</SortKeywords>
        </SortWrapper>
      </Header>
      <ProductList>
        {products.map((product) => (
          <ProductContainer key={product.id}>
            <Image alt="Product Image" src={product.imageUrl} />
            <ProductContent>
                <ProductCode>{product.id}</ProductCode>
                <ProductTitle className="text-wrapper-7">{product.name}</ProductTitle>
            </ProductContent>
            <ProductContent>
              <Quantity>{product.quantity}개</Quantity>
              <Price>{product.price}원</Price>
            </ProductContent>
          </ProductContainer>
        ))}
      </ProductList>
      <ButtonWrapper>
        <PlusButton onClick={handlePageChange}>
          <PlusBtnSvg></PlusBtnSvg>
        </PlusButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Products;

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
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

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
`;

const Select = styled.select`
  padding: 5px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SortWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
`;

const SortKeywords = styled.button`
  justify-content: space-between;
  color: #828282;
  font-size: 12px;
  font-weight: 400;
  margin-left: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.3s, font-weight 0.3s; /* 부드러운 전환 효과 추가 */

  &:hover {
    color: #333; /* 호버 시 글자 색상 변경 */
    font-weight: 700; /* 호버 시 글자 굵기 변경 */
  }

  &:focus {
    outline: none; /* 포커스 시 테두리 제거 */
  }

  &:active {
    color: #555; /* 클릭 시 글자 색상 변경 */
  }
`;

const ProductList = styled.div`
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
`;

const ProductContainer = styled.div`
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #d9d9d9;
  display: flex; /* Flexbox를 사용하여 내부 요소를 가로로 배열합니다 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 10px;
  height: 96px;
`;

const Image = styled.img`
  height: 80px;
  width: 74px; /* 이미지 너비 지정 */
  object-fit: cover;
  margin-right: 16px; /* 이미지와 다음 내용 사이 여백 */
`;

const ProductContent = styled.div`
  //margin-top: 10px;
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  display: flex;
  flex-direction: column;
`;

const ProductCode = styled.div`
  color: #757575;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 8px; /* 아래 여백 추가 */
`;

const ProductTitle = styled.div`
  color: #000000;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 8px; /* 아래 여백 추가 */
`;

const Price = styled.div`
  color: #111111;
  font-size: 22px;
  font-weight: 500;
  align-self: flex-end; /* 오른쪽 맨 아래로 정렬 */
`;

const Quantity = styled.div`
  color: #9e3500;
  font-size: 15px;
  font-weight: 500;
  align-self: flex-end; /* 오른쪽 맨 아래로 정렬 */
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 중앙에 배치 */
  width: 100%;
  margin-top: 20px;
`;

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

