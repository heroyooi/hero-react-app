// 기초 유틸
const utils = {
  isString: function (val) {
    return typeof val === 'string';
  },
  isObject: function (val) {
    return typeof val === 'object';
  },
  isFunction: function (val) {
    return typeof val === 'function';
  },
  isBoolean: function (val) {
    return typeof val === 'boolean';
  },
  isUndefined: function (val) {
    return typeof val === 'undefined';
  },
  isDefined: function (val) {
    return typeof val !== 'undefined';
  },
  isNumber: function (val) {
    return typeof val === 'number';
  },
  isArray: function (val) {
    return Array.isArray(val);
  },
  isDate: function (val) {
    return Object.prototype.toString.call(val) === '[object Date]';
  },
  isEmpty: function (val) {
    return val === null || typeof val === 'undefined' || (val + '').trim() === '';
  },
  isEmptyList: (val) => {
    return !(utils.isArray(val) && val.length > 0);
  },
  isEmptyArray: (val) => {
    return utils.isArray(val) && val.length === 0;
  },
  isEmptyObj: function (val) {
    return utils.isObject(val) && val !== null && Object.values(val).length === 0;
  },
  parseIntOrDefault: function (val, defaultVal) {
    var _int = parseInt(val, 10);
    return isNaN(_int) ? defaultVal : _int;
  },
  validLen: (val, cond) => {
    return cond !== false ? (val + '').trim().length : val.length;
  },
};

utils.hasProperty = function (obj, key) {
  if (utils.isObject(obj) && obj !== null) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  return false;
};

utils.log = console.log.bind(console);

export default utils;
