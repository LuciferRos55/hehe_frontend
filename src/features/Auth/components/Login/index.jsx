/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */


import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';


function Login(props) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            values.identifier = values.email;
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            enqueueSnackbar("Login successfully", {
                variant: "success",
                autoHideDuration: 1000
            });
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    }

    return (
        <LoginForm onSubmit={handleSubmit} />
    );
}

Login.propTypes = {

};

Login.defaultProps = {

};

export default Login;