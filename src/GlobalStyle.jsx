import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
      
  }
    
&::-webkit-scrollbar {
    display: none;
  }
  body {
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyles;
