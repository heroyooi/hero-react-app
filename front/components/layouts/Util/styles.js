import styled from 'styled-components';

export const UtilWrap = styled.ul`
  position: absolute;
  right: 10px;
  top: 18px;
  overflow: hidden;
  li {
    float: left;
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
    a {
      font-weight: 500;
      transition: color 0.2s;
      &:hover {
        color: #964b00;
      }
    }
    em {
      color: #964b00;
      font-weight: 500;
    }
  }
  @media screen and (max-width: 640px) {
    position: static;
    float: right;
    margin-top: 10px;
  }
`;
