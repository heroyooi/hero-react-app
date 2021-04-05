import styled from 'styled-components';

export const HeaderWrap = styled.header`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #000;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;
