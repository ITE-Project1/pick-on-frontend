import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from "../../auth/axiosConfig";
import styled from 'styled-components';
import OrderModal from "./OrderModal";

const storeIdMap =   {
  1: '천호점',
  2: '목동점',
  3: '무역센터점',
  4: '더현대서울점',
  5: '압구정본점'
};

//드롭박스 컴포넌트
const CustomDropdown = ({ stores, counter, selectedStore, handleStoreChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState('down');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (storeId) => {
    handleStoreChange(storeId);
    setIsOpen(false);
  };

  const adjustDropdownDirection = () => {
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (dropdownRect.bottom + 200 > viewportHeight) {
      setOpenDirection('up');
    } else {
      setOpenDirection('down');
    }
  };

  useEffect(() => {
    if (isOpen) {
      adjustDropdownDirection();
    }
  }, [isOpen]);

  //드롭박스 내 텍스트
  // 드롭박스 내 텍스트
  const renderOptionText = (store, counter) => {
    const isDirectPickupAvailable = store.quantity >= counter;
    return (
        <OptionTextContainer>
          <span>{storeIdMap[store.storeId]} (수량: {store.quantity})</span>
          {isDirectPickupAvailable && <HighlightText>바로 픽업 가능</HighlightText>}
        </OptionTextContainer>
    );
  };


  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedStore ? storeIdMap[selectedStore] : '지점 선택'}
        <Arrow />
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer direction={openDirection}>
          <DropdownList>
            {stores.map((store, index) => (
              <React.Fragment key={store.storeId}>
                <ListItem onClick={() => handleOptionClick(store.storeId)}>
                  {renderOptionText(store, counter)}
                </ListItem>
                {index < stores.length - 1 && <Divider />} {/* 마지막 항목 뒤에는 선이 표시되지 않도록 */}
              </React.Fragment>
            ))}
          </DropdownList>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNum = searchParams.get('page');

  const [product, setProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [directPickup, setDirectPickup] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [orderResponse, setOrderResponse] = useState(null); // 주문 응답 상태 추가

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/detail/${productId}`);
        const productData = response.data[0];
        setProduct({
          productId: productData.productId,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl,
          brandName: productData.brandName
        });

        setStores(response.data.map(item => ({ storeId: item.storeId, quantity: item.quantity })).sort((a, b) => a.storeId - b.storeId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, pageNum]);

  const handleIncrement = () => {
    if (counter < 10) {
      setCounter(counter + 1);
    }
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleStoreChange = (storeId) => {
    setSelectedStore(storeId);
    const selectedStore = stores.find(store => store.storeId === storeId);
    if (selectedStore && selectedStore.quantity >= counter) {
      console.log("counter:",counter);
      console.log("store quantity:",selectedStore.quantity);
      setDirectPickup(1);
    } else {
      setDirectPickup(0);
    }
  };

  const handlePickup = async () => {
    if (!selectedStore) {
      alert('지점을 선택해주세요.');
      return;
    }
    const selectedStoreData = stores.find(store => store.storeId === selectedStore);
    if (!selectedStoreData) {
      alert('유효한 지점을 선택해주세요.');
      return;
    }

    const payload = {
      productId: product.productId,
      quantity: counter,
      storeId: selectedStore,
      directPickup: directPickup
    };
    console.log('Sending payload:', payload);

    try {
      const response = await axios.post('http://localhost:8080/orders', payload);
      console.log('Server response:', response.data);
      setOrderResponse(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error sending pickup request:', error);
      alert('로그인 해주세요');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
      <Container>
        <Header></Header>
        <ProductInfoWrapper>
          <ProductInfoBody>
            <ImageWrapper>
              <Image src={product.imageUrl} alt={product.name} />
            </ImageWrapper>
            <ProductBrand>
              {product.brandName}
            </ProductBrand>
            <ProductName>
              <h1>{product.name}</h1>
            </ProductName>
            <ProductPrice>{product.price?.toLocaleString()}원</ProductPrice>
          <ProductDescription>{product.description}
            <Line><hr /></Line>
          </ProductDescription>
          <CounterContainer>
            <CounterLabel>
              주문수량
            </CounterLabel>
            <CounterWrapper>
              <Button onClick={handleDecrement} disabled={counter === 1}>-</Button>
              <Counter>{counter}</Counter>
              <Button onClick={handleIncrement} disabled={counter === 10}>+</Button>
            </CounterWrapper>
          </CounterContainer>
          <CustomDropdown
            stores={stores}
            counter={counter}
            selectedStore={selectedStore}
            handleStoreChange={handleStoreChange}
          />
          <Text>바로 픽업이 가능하지 않은 지점의 경우 최대 2-3일 정도 소요될 수 있습니다</Text>

          <OrderButton textColor="white" onClick={handlePickup}>픽업하기</OrderButton>
        </ProductInfoBody>
      </ProductInfoWrapper>
      {orderResponse && (
        <OrderModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          orderResponse={orderResponse}
        />
      )}
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 15px;
`;

const ProductInfoWrapper = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  align-items: center;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
`;

const ProductInfoBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  border: 1px solid #f0f0f0; 
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const ProductBrand = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-top: 1rem;
  color: #828282;
  margin-bottom: 15px;
`
const ProductName = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #9E3500;
  text-align: left;
  font-weight: bold;
  height: 40px;
`;

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: right;
`;

const ProductDescription = styled.div`
  margin-top: 40px;
`;

const Line = styled.div`
  margin-top: 50px;
  hr {
    border: none;
    border-top: 2px solid #f0f0f0;
  }
`;

const CounterContainer = styled.div`

  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const CounterLabel = styled.div`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #46675C;
`;

const CounterWrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Counter = styled.div`
  text-align: center;
  height: 100%;
  font-size: 17px;
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${props => (props.disabled ? 'white' : '#46675C' )};
    color: ${props => (props.disabled ? 'black' : 'white')};
  }
`;

const Text = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #46675C;
`;



//드롭박스
const DropdownContainer = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  margin-right: 50px;
`;

const DropdownHeader = styled.div`
  color: #828282;
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 추가하여 세로 정렬 */
`;

const Arrow = styled.div`
  &::after {
    content: '';
    width: 8px; /* 사이즈 */
    height: 8px; /* 사이즈 */
    border-top: 1.5px solid gray; /* 선 두께 */
    border-right: 1.5px solid gray; /* 선 두께 */
    display: inline-block;
    transform: rotate(135deg); /* 각도 */
    margin-right: 10px; /* 화살표와 텍스트 사이에 여유 공간 추가 */
    margin-bottom: 5px;
  }
`;

const DropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  top: ${({ direction }) => (direction === 'up' ? 'auto' : '100%')};
  bottom: ${({ direction }) => (direction === 'up' ? '100%' : 'auto')};
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0; /* 파란색 선으로 설정 */
  margin: 0;
`;


const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 세로 정렬 */
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HighlightText = styled.span`
  color: green;
  margin-left: 10px; /* 왼쪽 여백 추가 */
`;

//'바로 픽업 가능' 오른쪽 정렬
const OptionTextContainer = styled.div`
  display: flex;
  justify-content: space-between; //flex box 내의 컨텐츠 사이 거리 주기
  width: 100%;
`;



const OrderButton = styled.button`
  margin-top: 50px;
  margin-bottom: 90px;
  color: white;
  background-color: black;

  border-radius: 30px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;