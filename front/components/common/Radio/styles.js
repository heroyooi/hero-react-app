import styled from 'styled-components';
import { IE_BROWSER } from '@styles/base';

export const RadioWrap = styled.span`
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    display: none;
    & + label {
      position: relative;
      padding-left: 20px;
      &:before,
      &:after {
        position: absolute;
        content: '';
        display: block;
      }
      &:before {
        left: 0;
        top: 3px;
        width: 16px;
        height: 16px;
        background: #fff;
        border: 1px solid #000;
        border-radius: 8px;
      }
      &:after {
        left: 4px;
        top: 7px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #000;
        display: none;
      }
      vertical-align: top; /* ie */
    }
    &:checked + label {
      &:after {
        display: block;
      }
    }
    &:disabled + label {
      opacity: 0.3;
    }
  }
  ${IE_BROWSER} {
    input:checked + label {
    }
  }
`;
