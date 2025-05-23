import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #000;
    color: #fff;
    font-family: 'Segoe UI', 'Pretendard', sans-serif;
    line-height: 1.5;
  }
  a { color: inherit; text-decoration: none; }
  button, input, textarea { font-family: inherit; }
`;

export default GlobalStyle;