import React, { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { CheckboxWrap } from './styles';

const Checkbox = ({ label, id, checked, disabled, onChange }) => {
  const [_checked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = useCallback((e) => {
    setChecked((prev) => !prev);
    onChange(e);
  }, []);

  return (
    <CheckboxWrap>
      <input type="checkbox" id={id} name={id} checked={_checked} disabled={disabled} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </CheckboxWrap>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default memo(Checkbox);
