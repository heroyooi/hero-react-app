import styled from 'styled-components';

export const PostFormWrapper = styled.div`
  display: inline-block;
  border: 1px solid #000;
  margin-bottom: 60px;
  .inner {
    padding: 10px;
    h3 {
      margin-bottom: 10px;
      font-size: 18px;
    }
    input,
    textarea {
      width: 100%;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    textarea {
      margin-top: 10px;
      width: 100%;
      height: 150px;
      padding: 5px;
    }
  }
`;
