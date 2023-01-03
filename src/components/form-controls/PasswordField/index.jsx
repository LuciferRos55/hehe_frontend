/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';


PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);

  const { formState } = form;
  const { errors } = formState;
  const hasError = errors[name];

  const toggleShowPassword = () => {
    setShowPassword(x => !x);
  };

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <OutlinedInput
            error={!!hasError}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            onChange={onChange}
            value={value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      >
      </Controller>
      <FormHelperText error={!!hasError} id={errors[name]}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default PasswordField;