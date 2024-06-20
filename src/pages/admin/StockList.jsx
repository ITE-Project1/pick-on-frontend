import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import SearchWrapper from "../../components/common/SearchWrapper";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";

function StockList() {
  let [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [keyword, setKeyword] = useState('');
  const [storeId, setStoreId] = useState('1');
  const [pageNum, setPageNum] = useState('0');
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/products?storeId=${storeId}&page=${pageNum}&sort=${sort}&keyword=${keyword}`
        );
        if(pageNum > 0) {
          setProducts(prevProducts => [...prevProducts, ...response.data.list]);
        } else {
          setProducts(response.data.list);
        }

        setHasMoreProducts(pageNum < response.data.totalPage - 1);
      } catch (error) {
        // if (error.response.data.errorCode === "FIND_FAIL_PRODUCTS") {
       if (error.response) {

          setErrorMessage("원하는 상품 목록을 불러올 수 없습니다.");
        } else {
          setErrorMessage("상품 목록을 불러오는 중 오류가 발생했습니다.");
        }
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [storeId, pageNum, sort, keyword]);

  const handleSearchChange = (e) => {
    console.log(e);
    setKeyword(e.target.value);
    setPageNum(0);
    updateProducts();
  };

  const handleStoreChange = (e) => {
    setPageNum(0);
    setStoreId(e.target.value);
    updateProducts();
  };

  const handleSortChange = (sortKeyword) => {
    setPageNum(0);
    setSort(sortKeyword);
    updateProducts();
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  }

  const updateProducts = () => {
    setProducts([]);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const updateErrorMessage = () => {
    setErrorMessage('');
  }

  return (
    <Container>
      <Header>
        <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />
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
      <ProductListWrapper>
        {products.length < 1 && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ProductList>
          {products.map((product) => (
            <ProductContainer key={product.id}>
              <Image src={product.imageUrl} alt="Product Image" />
              <ProductContent>
                <ProductTitle className="text-wrapper-7">{product.name}</ProductTitle>
                <ProductCode>{product.id}</ProductCode>
              </ProductContent>
              <ProductContent>
                <Quantity>{product.quantity}개</Quantity>
                <Price>{formatPrice(product.price)}원</Price>
              </ProductContent>
            </ProductContainer>
          ))}

          <ButtonWrapper>
            {hasMoreProducts && (
              <PlusButton onClick={handlePageChange}>
                <PlusBtnSvg></PlusBtnSvg>
              </PlusButton>
            )}
          </ButtonWrapper>
        </ProductList>
      </ProductListWrapper>
    </Container>
  );
}

export default StockList;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
  margin-top:15px;
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

const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 305px);
`;

const ProductList = styled.div`
  //margin-left: 20px;
  //margin-right: 20px;
  overflow-y: auto;
  flex-grow: 1; /* flex-grow 속성을 사용하여 나머지 공간을 채우도록 설정 */
  &::-webkit-scrollbar {
    display: none;
  }
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

const ImageContainer = styled.div`
  border: 1px solid #f0f0f0;
  width: 74px; /* 컨테이너 너비 지정 */
  height: 80px; /* 컨테이너 높이 지정 */
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 설정 */
  background-size: cover; /* 이미지를 컨테이너에 맞게 크기 조정 */
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 16px; /* 컨테이너와 다음 내용 사이 여백 */
`;

const Image = ({ src, alt }) => (
  <ImageContainer style={{ backgroundImage: `url(${src})` }} alt={alt} />
);

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
  font-size: 20px;
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
  margin-top: 10px;
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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;
