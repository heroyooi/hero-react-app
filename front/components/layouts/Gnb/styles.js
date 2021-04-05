import styled from 'styled-components';

export const GnbWrap = styled.ul`
  position: absolute;
  left: 230px;
  top: 18px;
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
  }
  @media screen and (max-width: 640px) {
    left: inherit;
    right: 10px;
  }
  @media screen and (max-width: 400px) {
    li a span {
      display: none;
    }
  }
`;
