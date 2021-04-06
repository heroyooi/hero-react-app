import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  padding: 30px 10px;
  min-height: calc(100vh - 100px);
`;

export const SubTitle = styled.h2`
  font-size: ${(props) => props.size}px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`;

export const Filter = styled.ul`
  position: absolute;
  right: 0;
  top: 0;
  li {
    float: left;
    margin-left: 10px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
    &.on {
      color: red;
      text-decoration: underline;
    }
  }
`;
