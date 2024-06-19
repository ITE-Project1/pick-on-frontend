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
        setStores(response.data.map(item => ({ storeId: item.storeId, quantity: item.quantity })));
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
    setSelectedStore(event.target.value);
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

            <ProductInfo>{product.description}
                <Line><hr></hr></Line>
            </ProductInfo>
            
            <CounterWrapper>
                <Button onClick={handleDecrement} disabled={counter===1}>-</Button>
                <Counter>{counter}</Counter>
                <Button onClick={handleIncrement} disabled={counter===10}>+</Button>
            </CounterWrapper>

            <StoreSelectorWrapper>
              <Select id="store-select" value={selectedStore} onChange={handleStoreChange}>
                <option value="">지점 선택</option>
                {stores.map(store => (
                  <option key={store.storeId} value={store.storeId}>
                     {storeIdMap[store.storeId]} (Quantity: {store.quantity}) {store.quantity >= counter ? '바로픽업 가능' : ''}
                  </option>
                ))}
              </Select>
        </StoreSelectorWrapper>
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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 246px);
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
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
//   background-color: #f0f0f0;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ProductName = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #9E3500;
  text-align: left;
  font-weight: bold;
  height: 40px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;

`;

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: right;
`;

const ProductInfo = styled.div`
  margin-top: 40px;


`;

const Line = styled.div`
  margin-top: 20px;
  hr {
    border: none;
    border-top: 2px solid #f0f0f0;
}
`
const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
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
    background-color: ${props => (props.disabled ? 'white' : 'black')};
    color: ${props => (props.disabled ? 'black' : 'white')};
  }
`;

const Counter = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
  height: 100v;
  margin: 0 10px;
  font-size: 17px;
`;

const StoreSelectorWrapper = styled.div`
  margin-top: 20px;
`;

const Select = styled.select`
  padding: 5px;
  width: 100%; 
  height: 50px;
  border: 1px solid #red;
  border-radius: 4px;
  color: #828282;
  width: 100%; /* 부모 요소의 너비에 맞추기 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
  font-size: 16px; /* 글자 크기를 키워서 드롭박스 크기를 조정 */
  height: 50px; /* 드롭박스 높이를 조정 */
`;

// const Select = styled.select`
//   padding: 10px; /* 패딩을 키워서 크기를 조정 */
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   width: 100%; /* 부모 요소의 너비에 맞추기 */
//   box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
//   font-size: 16px; /* 글자 크기를 키워서 드롭박스 크기를 조정 */
//   height: 50px; /* 드롭박스 높이를 조정 */
//   option {
//     color: black; /* 기본 옵션 색상 */
//   }

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


