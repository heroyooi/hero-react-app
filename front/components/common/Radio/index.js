import React, { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { RadioWrap } from './styles';

const Radio = ({ label, name, id, checked, disabled, onChange }) => {
  const [_checked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = useCallback((e) => {
    setChecked((prev) => !prev);
    onChange(e);
  }, []);

  return (
    <RadioWrap>
      <input type="radio" id={id} name={name} checked={_checked} disabled={disabled} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </RadioWrap>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
};

export default memo(Radio);
