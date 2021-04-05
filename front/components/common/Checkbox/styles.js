import styled from 'styled-components';

export const CheckboxWrap = styled.span`
  position: relative;
  display: inline-block;
  input {
    position: absolute;
    opacity: 0;
    display: none;
    & + label {
      position: relative;
      padding-left: 20px;
      &:before {
        position: absolute;
        left: 0;
        top: 3px;
        content: '';
        display: block;
        width: 15px;
        height: 15px;
        background: #fff;
        border: 1px solid #000;
        border-radius: 3px;
        transition: background 0.2s;
      }
      vertical-align: top; /* ie */
    }
    &:checked + label {
      &:before {
        background: #000;
      }
    }
    &:disabled + label {
      opacity: 0.3;
    }
  }
`;
