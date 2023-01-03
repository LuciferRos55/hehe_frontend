/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { setMode } from '../../../../components/Header/headerSlice';

const theme = createTheme();

UpdateUserProfileForm.propTypes = {
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

function UpdateUserProfileForm(props) {
    const classes = useStyles();
    const loggedInUser = useSelector(state => state.user.current)

    const dispatch = useDispatch();
    const schema = yup.object().shape({
        email: yup.string().required('Please enter email.').email('Please enter a valid email address.'),
        // password: yup.string().required('Please enter password').min(6, 'Password is too short'),
        name: yup.string().required('Please enter fullname').min(6, 'Fullname is too short'),
        // birthdate: yup.string().required('Please enter birthdate').min(6, 'Birthdate is too short'),
    });
    const form = useForm({
        defaultValues: {
            email: loggedInUser.email,
            //   password: '',
            name: loggedInUser.name,
            // birthdate: ''
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };

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
                        User Profile
                    </Typography>

                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <InputField disabled name="email" label="Email" form={form} />
                        <InputField name="name" label="Name" form={form} />

                        {
                            isSubmitting &&
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }

                        <Button sx={{
                            marginTop: 2,
                        }}
                            disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
                            Update
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UpdateUserProfileForm;
