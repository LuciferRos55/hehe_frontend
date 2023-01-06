/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, Stack, Avatar, Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { setMode } from '../../../../components/Header/headerSlice';

const theme = createTheme();

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles(() => ({
  root: {

  },
  link: {
    "margin-top": "15px",
    "text-decoration": "none"
  }
}));

function LoginForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup.string().required('Please enter email.').email('Please enter a valid email address.'),
    password: yup.string().required('Please enter password').min(6, 'Password is too short'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const handleGoogle = async (values) => { }

  const { isSubmitting } = form.formState

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined></LockOutlined>
          </Avatar>

          <Typography component="h3" variant="h5">
            Sign In
          </Typography>

          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="Password" form={form} />
            <Stack direction='row' sx={{
              marginTop: 2
            }}>
              <Typography variant="h8">
                Forgot your password?
              </Typography>
              <Typography component="div" variant="h8" sx={{
                marginLeft: 1
              }}>
                <Link className={classes.link} href='/forgotpassword' underline='none'>
                  Reset password
                </Link>
              </Typography>
            </Stack>

            {
              isSubmitting &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            }

            <Button sx={{
              marginTop: 2,
              backgroundColor: '#2e6b73'
            }}
              disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>

          </form>

          <Typography component="h3" variant="h5" sx={{
            marginTop: 2
          }}>
            Or
          </Typography>

          <Button sx={{
            marginTop: 2,
            backgroundColor: '#2e6b73'

          }}
            href="/signOn"
            disabled={isSubmitting} variant="contained" color="primary" startIcon={<GoogleIcon />} fullWidth>
            Continue with Google
          </Button>

          <Stack direction='row' sx={{
            marginTop: 2
          }}>
            <Typography variant="h8">
              Dont have an account?
            </Typography>
            <Typography component="div" variant="h8" sx={{
              marginLeft: 1
            }}>
              <Link className={classes.link} href='/register' underline='none'>
                Register Now!
              </Link>
            </Typography>
          </Stack>

        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
