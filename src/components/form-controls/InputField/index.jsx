/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-use-before-define */
// import { PropTypes } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';



InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const {
    form, name, label, disabled,
  } = props;

  const { formState } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, value},
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          error={!!hasError}
          helperText={errors[name]?.message}
          onChange={onChange}
          value={value}
          margin="normal"
          fullWidth
          label={label}
          disabled={disabled}
          id={name}
        />
      )}
    />
  );
}

export default InputField;