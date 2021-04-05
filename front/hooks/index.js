import _useInput from './useInput';
import _useResize from './useResize';

const hooks = {
  useInput: _useInput,
  useResize: _useResize,
};

// 개별 export 하지 않으면 에러 발생 (import 와 module.exports를 같이 사용할 수 없기 때문)
export const useInput = hooks.useInput;
export const useResize = hooks.useResize;

export default hooks;
