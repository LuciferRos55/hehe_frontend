/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */


import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import groupApi from '../../../../api/groupApi';
import { callApiGetListGroup } from '../../groupSlice';
import CreateGroupForm from '../CreateGroupForm';


function CreateGroup(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const {onClose} = props;

    const handleSubmit = async (values) => {
        try {
            const resp = await groupApi.createGroup(values);

            if (onClose) {
                onClose();
            }

            enqueueSnackbar("Create group successfully!!", {
                variant: "success",
                autoHideDuration: 1000
            });

            const action = callApiGetListGroup();
            dispatch(action);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    }

    return (
        <CreateGroupForm onSubmit={handleSubmit} onClose={onClose}/>
    );
}

CreateGroup.propTypes = {
    onClose: PropTypes.func,
};

CreateGroup.defaultProps = {
    onClose: () => {}
};

export default CreateGroup;