import { createGlobalStyle } from 'styled-components';

// Common
export const FONT_FAMILY = '"Noto Sans KR", "Malgun Gothic", "맑은 고딕", sans-serif;';

// Media Query
export const IE_BROWSER = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)';
export const DEVICE_MOBILE = '@media screen and (max-width: 768px)';
export const DEVICE_TABLET = '@media screen and (max-width: 1080px)';
export const DEVICE_DESKTOP = '@media screen and (min-width: 1081px)';

export const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    letter-spacing: -1px;
    font-family: ${FONT_FAMILY};
    font-size: 14px;
    color: #333;
    line-height:1.4;
    background: #ffffff;
    -webkit-text-size-adjust:none;
    min-width: 320px;
    overflow-x: hidden;
  }
  fieldset {
    min-width:100%;
  }
  h1, h2, h3, h4, h5, h6, form, div, p, em, img, table, tr, td, fieldset, label, dl, dt, dd {
    padding: 0;
    margin: 0;
    border: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 14px;
    font-weight: normal;
  }
  hr {display: none;}
  label {vertical-align:middle;}
  em, i {font-style:normal; }
  ul, ol, li {padding:0; margin:0; list-style:none;}
  .hide { position:absolute; left:-9999px; font-size:0; width:0; height:0; text-indent:-9999px; overflow:hidden; }
  img {vertical-align:top; border:none 0;}
  table {width:100%;border:0;border-collapse:collapse;border-spacing:0;empty-cells:show;}
  button {cursor:pointer;border:none;}
  textarea, input, button, select {
    font-size: 14px;
    font-family: ${FONT_FAMILY};
    outline:none;
  }

  a, a:link, a:active, a:visited {
    color: #333;
    text-decoration:none;
    cursor: pointer;
  }
  a {
    -webkit-tap-highlight-color:rgba(0,0,0,0.05);
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
  input, textarea {
    outline: none;
  }
  textarea {
    resize: none;
  }

  #wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
`;
