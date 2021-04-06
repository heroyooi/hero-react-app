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
  top: ${(props) => props.top}px;
  li {
    float: left;
    margin-left: 10px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
    &.on {
      color: #964b00;
      text-decoration: underline;
    }
  }
`;

export const Card = styled.ul`
  margin-bottom: 10px;
  li {
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 10px;
    &:first-child {
      margin-top: 0;
    }
    span {
      display: block;
      &.title {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #000;
      }
      &.desc {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`;
