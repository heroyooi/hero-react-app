import { useState, useCallback } from 'react';

const useInput = (initValue, callback) => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback(
    (e) => {
      setValue(e.target.value);
      if (typeof callback === 'function') callback(e.target.value);
    },
    [callback],
  );
  return [value, handler, setValue];
};

export default useInput;
