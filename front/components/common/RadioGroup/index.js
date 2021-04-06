import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@components';
import { RadioGroupWrap } from './styles';

const RadioGroup = ({ items, onChange }) => {
  return (
    <RadioGroupWrap>
      {items.map((item) => (
        <Radio
          key={item.id}
          id={item.id}
          label={item.label}
          name={item.name}
          disabled={item.disabled}
          checked={item.checked}
          onChange={onChange}
        />
      ))}
    </RadioGroupWrap>
  );
};

RadioGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default memo(RadioGroup);
