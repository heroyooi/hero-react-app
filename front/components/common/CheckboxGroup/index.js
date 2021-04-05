import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'components';
import { CheckboxGroupWrap } from './styles';

const CheckboxGroup = ({ items, onChange }) => {
  return (
    <CheckboxGroupWrap>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          label={item.label}
          disabled={item.disabled}
          checked={item.checked}
          onChange={onChange}
        />
      ))}
    </CheckboxGroupWrap>
  );
};

CheckboxGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default CheckboxGroup;
