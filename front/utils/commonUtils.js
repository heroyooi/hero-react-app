import baseUtils from './baseUtils';

// 기초 유틸
const utils = {};

// string 문자열에 콤마(',')를 찍고, 구분자를 뒤에 붙여준다
utils.setComma = function (str, separator) {
  var result = '';

  if (!baseUtils.isEmpty(str) || str === '0') {
    str = String(str);
    result = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

    if (!baseUtils.isEmpty(separator)) {
      result = result + separator;
    }
  }

  return result;
};

// 특정 위치로 스크롤링
utils.scrollToTarget = (ref) => {
  window.scrollTo({ top: window.pageYOffset + ref.current.getBoundingClientRect().top, behavior: 'auto' });
};

// 클릭 이벤트 설정 시 제외 영역을 지정
utils.getExcludeArea = (selectors, event) => {
  if (selectors.length > 0) {
    const arr = [];
    for (let i = 0; i < selectors.length; i++) {
      arr.push(selectors[i] === undefined ? true : !selectors[i].contains(event.target));
    }
    return arr.every((v) => v === true);
  } else {
    // selectors가 노드인 경우도 체크
    return !selectors.contains(event.target);
  }
};

// 유효성 검사
utils.isValidation = (val, method, state) => {
  let format = false;
  if (method === 'email') {
    // 이메일
    format = /([\w-\\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  } else if (method === 'phone') {
    // 휴대폰
    format = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;
  } else if (method === 'num') {
    // 숫자
    format = /[0-9]/g;
  } else if (method === 'pw1') {
    // 영문자, 숫자 조합 (6~20자)
    format = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/;
  } else if (method === 'pw2') {
    // 같은 문자 3번 이상 사용
    format = /(\w)\1\1/;
  } else if (method === 'spe') {
    // 특수
    format = /[`!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
  } else if (method === 'pw3') {
    // 아이디에 포함된 문자, 숫자와 연속 3자 이상 동일한 조합 제외
    console.log('state ::: ', state);
    let tmp = '';
    let cnt = 0;
    for (let i = 0; i < state.length - 2; i++) {
      tmp = state.charAt(i) + state.charAt(i + 1) + state.charAt(i + 2);
      if (val.indexOf(tmp) > -1) {
        cnt = cnt + 1;
      }
    }
    if (cnt > 0) {
      return true;
    } else {
      return false;
    }
  } else if (method === 'coupon') {
    // 18자리 쿠폰번호
    format = /(?=.*\d)(?=.*[a-zA-Z]).{18}/; // 영문자, 숫자 조합 (18자)
  } else if (method === 'tag') {
    // 태그
    format = /(<[^>]+[>])/g;
  }

  return format.test(val);
};

// IE 체크
utils.isExplorer = function () {
  if (typeof navigator !== 'undefined' && navigator?.userAgent) {
    const agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1) {
      return true;
    }
    return false;
  }
  return false;
};

// IE 버전 체크(7,8,9 or 10,11)
utils.getIeOldVersion = function () {
  const hasIE = utils.isExplorer();

  if (hasIE === true) {
    let word;
    const agent = navigator.userAgent.toLowerCase();

    // IE old version ( IE 10 or Lower )
    if (navigator.appName === 'Microsoft Internet Explorer') {
      word = 'msie ';
    } else if (agent.search('trident') > -1) {
      // IE 11
      word = 'trident/.*rv:';
    } else if (agent.search('edge/') > -1) {
      // Microsoft Edge
      word = 'edge/';
    } else {
      // 그 외, IE가 아니라면 ( If it's not IE or Edge )
      return false;
    }

    const reg = new RegExp(word + '([0-9]{1,})(\\.{0,}[0-9]{0,1})');

    if (reg.exec(agent) !== null) {
      const version = parseFloat(RegExp.$1 + RegExp.$2);

      if (version < 10) {
        return true;
      }
    }
    return false;
  }
  return false;
};

// 영어 대문자로 치환
utils.upperCase = (val) => {
  return ('' + val).toUpperCase();
};
// 영어 소문자로 치환
utils.lowerCase = (val) => {
  return ('' + val).toLowerCase();
};
utils.cutString = (val, num) => {
  return val.substr(0, num);
};

/**
 * 인지 가능한 논리 오류에 대하여 throw new Error 를 대체
 * @param {String} code
 * @param {String} message
 * @param {Function} dispatch
 */
utils.CustomException = (error = new Error(), code = 'USER_ERROR', message = '', dispatch) => {
  error.code = code;
  error.message = error.message + ' : ' + message;
  return error;
};

export default utils;
