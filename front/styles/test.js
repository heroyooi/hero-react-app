import styled from 'styled-components';

export const TestSection = styled.section`
  min-height: 600px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-top: 10px;
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  ul {
    margin-top: 10px;
    li {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      &:first-child {
        margin-top: 0;
      }
      dt {
        font-size: 16px;
        font-weight: 500;
      }
      p.info {
        font-size: 12px;
      }
    }
  }
`;
