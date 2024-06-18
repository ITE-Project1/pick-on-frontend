import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import searchIcon from '../../assets/img/searchIcon.svg'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('');
  const [keyword, setKeyword] = useState('');
  const [storeId, setStoreId] = useState('1');
  const [isOpen, setIsOpen] = useState(false);
  const [localKeyword, setLocalKeyword] = useState(''); // 로컬 상태 추가

  const query = useQuery();

  useEffect(() => {
    const page = parseInt(query.get('page')) || 0;
    const sort = query.get('sort') || '';
    const keyword = query.get('keyword') || '';
    const storeId = query.get('storeId') || '1';

    setCurrentPage(page);
    setSortField(sort);
    setKeyword(keyword);
    setStoreId(storeId);

    fetchProductList(currentPage, sortField, keyword, storeId);
  }, []);

  const fetchProductList = async(page, sort, keyword, storeId) => {
    try {
      const response = await axios.get('http://localhost:8080/admin/products', {
        params: {
          storeId: storeId,
          page: page,
          sort: sort,
          keyword: keyword
        }
      });

      setProducts(response.data);
      setTotalPages(response.data.length);
    } catch (error) {
      console.log("Error Fetching product list:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (field) => {
    console.log(field);
    setSortField(field);
  };


  const handleKeywordChange = (event) => {
    setLocalKeyword(event.target.value); // 로컬 상태 업데이트
  };

  const handleStoreChange = (id) => {
    console.log(id);
    setStoreId(id);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    setKeyword(localKeyword); // 검색 버튼 클릭 시 상태 업데이트
  };

  return (
    <ContentWrapper>
      <SearchWrapper>
        <InputWrapper>
          <Button onClick={handleSearch}></Button>
          <Input type="text" placeholder="Search" value={localKeyword} onChange={handleKeywordChange}/>
        </InputWrapper>
      </SearchWrapper>
      <StoreFilter>
        <DropdownToggle onClick={toggleDropdown}>압구정본점</DropdownToggle>
        <DropdownContent isOpen={isOpen}>
          <DropDownStore onClick={() => handleStoreChange(1)}>천호점</DropDownStore>
          <DropDownStore onClick={() => handleStoreChange(2)}>목동점</DropDownStore>
          <DropDownStore onClick={() => handleStoreChange(3)}>무역센터점</DropDownStore>
          <DropDownStore onClick={() => handleStoreChange(4)}>더현대서울점</DropDownStore>
          <DropDownStore onClick={() => handleStoreChange(5)}>압구정본점</DropDownStore>
        </DropdownContent>
      </StoreFilter>
      <SortWrapper>
        <SortKeywords onClick={() => handleSortChange("")}>최신순</SortKeywords>
        <SortKeywords onClick={() => handleSortChange("priceLow")}>낮은 가격순</SortKeywords>
        <SortKeywords onClick={() => handleSortChange("priceHigh")}>높은 가격순</SortKeywords>
      </SortWrapper>
      <ProductList>
        {products.map((product) => (
          <ProductContainer key={product.id}>
            <Image alt="Product Image" src={product.image} />
            <ProductContent>
                <ProductCode>{product.id}</ProductCode>
                <ProductTitle className="text-wrapper-7">{product.name}</ProductTitle>
            </ProductContent>
            <ProductContent>
              <Quantity>{product.quantity}</Quantity>
              <Price>{product.price}</Price>
            </ProductContent>
          </ProductContainer>
        ))}
      </ProductList>
    </ContentWrapper>
  );
}

export default Products;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px 20px;
`;

const SearchWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 100px;
  height: 40px;
  width: 380px;
  top: 100px;
  display: flex;
  align-items: center;
  margin: 0 auto; /* 수평 중앙 정렬 */
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  background: url(${searchIcon}) no-repeat center; /* import한 이미지 사용 */
  background-size: cover; /* 이미지를 버튼 크기에 맞게 설정 */
  border: none;
  width: 24px; /* 버튼 너비 조정 */
  height: 24px; /* 버튼 높이 조정 */
  cursor: pointer;
  margin-right: 10px; /* 버튼과 입력 필드 사이의 간격 */
  margin-left: 5px;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: #828282;
  font-size: 12px;
  font-weight: 400;
  height: 100%;
  letter-spacing: 0;
  line-height: 18px;
  width: calc(100% - 50px); /* 버튼 너비를 고려하여 조정 */
  outline: none; /* 입력창 포커스 시 발생하는 외곽선 제거 */
`;

const StoreFilter = styled.div`
  text-align: right;
  margin-right: 34px; /* 원하는 간격 설정 */
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px #cccccc;
  padding: 8px;
  top: calc(100% + 5px);
  right: 0; /* 오른쪽 정렬 추가 */
  z-index: 10;
`;

const DropdownToggle = styled.button`
  background: none;
  border: none;
  color: #8d8d8d;
  cursor: pointer;
  padding: 8px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  white-space: nowrap;
  width: fit-content;
  z-index: 1;
`;

const DropDownStore = styled.div`
  color: #8d8d8d;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const SortWrapper = styled.div`
  display: flex;
`;

const SortKeywords = styled.div`
  justify-content: space-between;
  color: #828282;
  font-size: 12px;
  font-weight: 400;
  margin-left: 20px;
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



// const productList = [
//   {
//     id: "QUKEJHREF",
//     name: "리브드 슬리브리스 탑",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-4@2x.png",
//     price: "21,000원",
//     quantity: "30개"
//   },
//   {
//     id: "EDLFKJWSA",
//     name: "쿨 워셔블 헨리넥 하프 니트(5color)",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-5@2x.png",
//     price: "31,430원",
//     quantity: "57개"
//   },
//   {
//     id: "LWEIUEWFSD",
//     name: "티메이커",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-6@2x.png",
//     price: "29,990원",
//     quantity: "1개"
//   },
//   {
//     id: "PWEOIDSAB",
//     name: "링클 프리 반팔 크롭 셔츠_WHITE",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-7@2x.png",
//     price: "19,376원",
//     quantity: "110개"
//   },
//   {
//     id: "LIEHVBDJQS",
//     name: "라운드 데님 셔츠 드레스",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-8@2x.png",
//     price: "70,500원",
//     quantity: "20개"
//   },
//   {
//     id: "IRUEWJSHD",
//     name: "개더드 애시메트릭 미디 드레스",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-10@2x.png",
//     price: "31,430원",
//     quantity: "3개"
//   },
//   {
//     id: "LKEIHAQWE",
//     name: "칼라리스 미니 셔츠 드레스",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-9@2x.png",
//     price: "75,000원",
//     quantity: "237개"
//   },
//   {
//     id: "ASDPOFIEL",
//     name: "엠브로이더리 울 셔츠 드레스",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-11@2x.png",
//     price: "90,000원",
//     quantity: "87개"
//   },
//   {
//     id: "LDJEIVOQE",
//     name: "비즈 박스 체인 네크리스",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-13@2x.png",
//     price: "44,500원",
//     quantity: "2개"
//   },
//   {
//     id: "MNDBCUYTR",
//     name: "미스매치드 비즈 드롭 이어링",
//     image: "https://c.animaapp.com/ex34MmYX/img/image-12@2x.png",
//     price: "27,600원",
//     quantity: "1개"
//   }
// ];
