import styled from 'styled-components';

export const ComponentMapWrap = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 3px;
  margin-top: 10px;
  & > div {
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
  }
`;
