/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { yupResolver } from '@hookform/resolvers/yup';
// import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import GroupsIcon from '@mui/icons-material/Groups';

const theme = createTheme();

CreateGroupForm.propTypes = {
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};

const useStyles = makeStyles(() => ({
    root: {

    },
    link: {
        "margin-top": "15px",
        "text-decoration": "none"
    }
}));

function CreateGroupForm(props) {
    const schema = yup.object().shape({
        name: yup.string().required('Please enter name').min(2, 'Name is too short'),
        description: yup.string().required('Please enter description').min(2, 'Description is too short'),
    });
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const handleCancel = () => {
        const { onClose } = props;
        if (onClose) {
            onClose();
        }
    }

    const { isSubmitting } = form.formState

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <GroupsIcon></GroupsIcon>
                    </Avatar>

                    <Typography component="h3" variant="h5">
                        Create Group
                    </Typography>

                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <InputField name="name" label="Name" form={form} />
                        <InputField name="description" label="Description" form={form} />

                        {
                            isSubmitting &&
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }

                        <Button sx={{
                            marginTop: 2,
                            marginLeft: 26,
                        }}
                            disabled={isSubmitting} type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                        <Button sx={{
                            marginTop: 2,
                            marginLeft: 1,
                        }}
                            disabled={isSubmitting} variant="contained" color="inherit" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </form>

                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateGroupForm;
