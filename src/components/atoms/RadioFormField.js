import React from 'react';
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import OrangeRadio from './OrangeRadioButton';

const FormField = props => {
  const { label, value, options, disabled, onChange } = props;

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={label}
        name={label}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <FormControlLabel
            disabled={option.disabled || disabled}
            value={option.value}
            control={<OrangeRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

FormField.defaultProps = {
  options: null,
  disabled: false,
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  disabled: PropTypes.bool,
};

export default FormField;
