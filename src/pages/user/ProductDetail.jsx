import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const storeIdMap = {
  1: '천호점',
  2: '목동점',
  3: '무역센터점',
  4: '더현대서울점',
  5: '압구정본점'
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : '옵션 선택'}
        <Arrow />
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer>
          <DropdownList>
            {options.map((option) => (
              <ListItem key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </ListItem>
            ))}
          </DropdownList>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
}

const ProductDetail = () => {
  const { productId } = useParams(); // URL에서 productId를 추출
  const location = useLocation(); // 현재 위치 객체를 가져옴
  const searchParams = new URLSearchParams(location.search); // 쿼리 파라미터를 파싱
  const pageNum = searchParams.get('page'); // 쿼리 파라미터에서 page 값을 가져옴

  const [product, setProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(''); // 선택된 지점 상태 추가
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1); 
  const [directPickup, setDirectPickup] = useState(0); // 바로 픽업 가능 상태 추가

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

  const handleStoreChange = (event) => {
    const selectedStoreId = event.target.value;
    setSelectedStore(selectedStoreId);
    const selectedStore = stores.find(store => store.storeId === parseInt(selectedStoreId));
    if (selectedStore && selectedStore.quantity >= counter) {
      setDirectPickup(1);
    } else {
      setDirectPickup(0);
    }
  };

  // const renderOptionText = (store, counter) => {
  //   const text = `${storeIdMap[store.storeId]} (Quantity: ${store.quantity})`;
  //   const highlight = store.quantity >= counter ? ' 바로 픽업 가능' : '';
  
  //   return { __html: `${text}${highlight ? `<span style="color: green;">${highlight}</span>` : ''}` };
  // };

  const HighlightText = styled.span`
  color: green;
  margin-left: 5px; // 위치 조정을 위한 예시
`;

const renderOptionText = (store, counter) => {
  const isDirectPickupAvailable = store.quantity >= counter;
  return (
    <span>
      {storeIdMap[store.storeId]} (Quantity: {store.quantity})
      {isDirectPickupAvailable && <HighlightText>바로 픽업 가능</HighlightText>}
    </span>
  );
};

  const handlePickup = async () => {
    if (!selectedStore) {
      alert('지점을 선택해주세요.');
      return;
    }
    const selectedStoreData = stores.find(store => store.storeId === parseInt(selectedStore));
    if (!selectedStoreData) {
      alert('유효한 지점을 선택해주세요.');
      return;
    }
//order controller로 전달할 데이터
    const payload = {
      "productId": product.productId,
      "quantity": counter,
      "storeId": parseInt(selectedStore),
      "directPickup": directPickup
    };
    console.log('Sending payload:', payload); // payload를 출력하여 확인

    try {
      const response = await axios.post('http://localhost:8080/orders', payload);
      console.log('Server response:', response.data);
      alert('픽업 요청이 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('Error sending pickup request:', error);
      alert('픽업 요청을 전송하는 중 오류가 발생했습니다.');
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
          {/* <StoreSelectorWrapper>
            <Select id="store-select" value={selectedStore} onChange={handleStoreChange}>
              <option value="">지점 선택</option>
              {stores.map(store => (
                <option key={store.storeId} value={store.storeId}dangerouslySetInnerHTML={renderOptionText(store, counter)} />
              ))}
            </Select>
          </StoreSelectorWrapper> */}
          <StoreSelectorWrapper>
  <Select id="store-select" value={selectedStore} onChange={handleStoreChange}>
    <option value="">지점 선택</option>
    {stores.map(store => (
      <option key={store.storeId} value={store.storeId}>
        {renderOptionText(store, counter)}
      </option>
    ))}
  </Select>
</StoreSelectorWrapper>

<CustomDropdown></CustomDropdown>

          <Text>바로 픽업이 가능하지 않은 지점의 경우 최대 2-3일 정도 소요될 수 있습니다</Text>

          <OrderButton textColor="white" onClick={handlePickup}>픽업하기</OrderButton>
        </ProductInfoBody>
      </ProductInfoWrapper>
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
  // display: flex;
  margin-left: 40px;
  margin-right: 40px;
  align-items: center;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
`;

const ProductInfoBody = styled.div`
  // border: 1px solid blue;
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
  margin-top: 80px;
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
  height: 100v;
  // margin: 0 10px;
  font-size: 17px;
  display: flex;
  align-item: center;
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



const StoreSelectorWrapper = styled.div`
  
  margin-top: 20px;
`;

const Select = styled.select`
  padding: 5px;
  width: 100%; 
  height: 40px; /* 드롭박스 높이를 조정 */
  border-radius: 9px;
  color: #828282; //글자 색깔
  width: 100%; /* 부모 요소의 너비에 맞추기 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
  font-size: 16px; /* 글자 크기를 키워서 드롭박스 크기를 조정 */

  // 드롭박스 클릭시 나타나는 옵션박스의 크기 조정
  option {

      border-radius: 19px;
      padding: 50px; /* 옵션의 패딩 조정 */
      font-size: 17px; /* 옵션의 글꼴 크기 조정 */
      
  }
`;

const HighlightedText = styled.span`
  color: green;
`;

const Text = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #46675C;
`;

const StoreList = styled.div`
  margin-top: 20px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin: 5px 0;
    }
  }
`;

const OrderButton = styled.button`
  margin-top: 50px;
  margin-bottom: 50px;
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


const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const DropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
`;

const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Arrow = styled.div`
  position: relative;
  &::after {
    content: '';
    width: 8px; /* 사이즈 */
    height: 8px; /* 사이즈 */
    border-top: 1.5px solid gray; /* 선 두께 */
    border-right: 1.5px solid gray; /* 선 두께 */
    display: inline-block;
    transform: rotate(135deg); /* 각도 */
    position: absolute;
    top: 10%; /* 기본 0px 값으로 해주세요 */
    left: 0%; /* 기본 0px 값으로 해주세요 */

  }
`;