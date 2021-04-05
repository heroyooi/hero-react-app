const utils = {};

const req = require.context('.', true, /^(?!.\/index).*.js$/);

req.keys().forEach((key) => {
  const module = req(key).default;
  if (typeof module === 'object') {
    Object.keys(module).forEach((moduleKey) => {
      if (Object.prototype.hasOwnProperty.call(utils, moduleKey)) {
        // 이미 등록되었다면 경로 로그 출력
        console.error(`Duplicate values exist during "utils" registration. [${key}] => [${moduleKey}]`);
      }
      utils[moduleKey] = module[moduleKey];
    });
  }
});

export default utils;
