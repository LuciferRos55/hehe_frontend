/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */


import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../../../../api/userApi';
import RegisterForm from '../RegisterForm';


function Register(props) {

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const data = await userApi.register(values);
            enqueueSnackbar("Register successfully. Check email to activate account!!", { variant: "success", autoHideDuration: 3000 });
            
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1000 });
        }
    }

    return (
        <RegisterForm onSubmit={handleSubmit} />
    );
}

Register.propTypes = {

};

Register.defaultProps = {

};

export default Register;