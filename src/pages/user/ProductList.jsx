import React, { useEffect, useState } from "react";
// import "../../components/styled/ProductList.css";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchWrapper from "../../components/common/SearchWrapper";
import { ReactComponent as PlusBtnSvg } from "../../assets/img/plusButton.svg";
import useDebounce from "../common/UseDebounce";


function ProductCard({ product }) {
  return (
    <Card>
      <StyledLink to={`/user/productDetail/${product.productId}`}>
        {" "}
        {/* 이미지와 상품명 클릭시 productDetail 페이지로 넘어간다. */}
        
        <ImageWrapper>
          <Image src={product.imageUrl} alt={product.name} />
        </ImageWrapper>
        <ProductBrand>{product.brandName}</ProductBrand>
        <ProductName>{product.name}</ProductName>
      </StyledLink>
      
      <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
    </Card>
  );
}

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("created_at");
  const [pageNum, setPageNum] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const debouncedSearchText = useDebounce(keyword, 500);

  useEffect(() => {
    fetchProducts();
  }, [pageNum, sort, debouncedSearchText]);

  useEffect(() => {
    // keyword가 변경될 때마다 페이지 맨 위로 스크롤 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [keyword]);

  const fetchProducts = async () => {
    console.log("pageNum:", pageNum);
    const url = `http://localhost:8080/products/list?page=${pageNum}&sort=${sort}&keyword=${debouncedSearchText}`;
    console.log("생성된 URL:", url);
    try {
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response data:", JSON.stringify(response.data, null, 2));
      if (pageNum > 1) {
        setProducts((prevProducts) => [...prevProducts, ...response.data.list]);
      } else {
        setProducts(response.data.list);
      }

      setHasMoreProducts(pageNum < response.data.totalPage);
    } catch (error) {
      if (error.response.data.errorCode === "FIND_FAIL_PRODUCTS") {
        setErrorMessage("원하는 상품 목록을 불러올 수 없습니다.");
      } else {
        setErrorMessage("상품 목록을 불러오는 중 오류가 발생했습니다.");
      }
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPageNum(1);
    setProducts([]); // 제품 목록 초기화
  };

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPageNum(1); // 페이지 번호를 1로 초기화
    setProducts([]); // 제품 목록 초기화
  };

  return (
    <Container>
      <Header>
        <SearchWrapper keyword={keyword} handleSearchChange={handleSearchChange} />
        <SortbyWrapper>
          <div className="sort-by">
            <SortOption isSelected={sort === "created_at"} onClick={() => handleSortChange("created_at")}>
              최신순
            </SortOption>
            <SortOption isSelected={sort === "priceLow"} onClick={() => handleSortChange("priceLow")}>
              낮은 가격순
            </SortOption>
            <SortOption isSelected={sort === "priceHigh"} onClick={() => handleSortChange("priceHigh")}>
              높은 가격순
            </SortOption>
          </div>
        </SortbyWrapper>
      </Header>
      <ProductWrapper>
        <ProductBody>
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </ProductGrid>
          <ButtonWrapper>
            {hasMoreProducts && (
              <PlusButton onClick={handlePageChange}>
                <PlusBtnSvg />
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
  margin-right: 40px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => (props.isSelected ? "#46675C " : "#828282")}; // 선택된 항목의 색깔 변경
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")}; // 선택된 항목의 글자 두껍게

  &:hover {
    text-decoration: underline;
  }
`;

const SortbyWrapper = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 20px;
  align-items: center;
  margin-left: 0; /* 화면 왼쪽에 붙게 설정 */
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 264px); //브라우저 창의 전체 높이(100vh)에서 246픽셀을 뺀 값
`;

const ProductBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; //세로 gap
  justify-content: space-between; //card 사이에 space 넣기
  width: 100%; /* 중앙 정렬을 위해 부모 요소의 너비를 채움 */
`;

const Card = styled.div`
  flex: 1 1 calc(200% - 20px);
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 40px; //카드 사이 간격
  border-radius: 10px;
  max-width: calc(47%); /* 2개씩 가로로 배치, 부피조정  */
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 0.5px solid #828282;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain;
`;

const ProductName = styled.div`
  margin-top: 6px;
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

const ProductBrand = styled.div`
  font-size: 14px;
  color: #9E3500;
  text-align: left;
  margin-top: 10px;
`

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: right;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 중앙에 배치 */
  width: 100%;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
`;



const SortBy = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -150px;
`;

const TextWrapper = styled.span`
  color: #46675c;
  font-weight: 700;
  text-decoration: underline;
`;

const Span = styled.span`
  color: #828282;
  font-family: "Apple SD Gothic Neo-Regular", Helvetica;
`;

