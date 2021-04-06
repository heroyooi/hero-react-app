import styled from 'styled-components';

export const GnbWrap = styled.ul`
  position: absolute;
  left: 230px;
  top: 18px;
  li {
    position: relative;
    float: left;
    margin-left: 10px;
    padding-left: 10px;
    &:before {
      content: '';
      display: block;
      width: 1px;
      height: 10px;
      background: #ddd;
      position: absolute;
      left: 0;
      top: 5px;
    }
    &.on {
      a {
        font-weight: 500;
        color: #964b00;
      }
    }
    &:first-child {
      margin-left: 0;
      padding-left: 0;
      &:before {
        display: none;
      }
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
