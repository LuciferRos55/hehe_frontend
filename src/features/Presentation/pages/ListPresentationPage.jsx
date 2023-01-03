/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, CircularProgress, DialogContent, DialogActions, Dialog, Grid, Paper } from '@mui/material';
import PresentationList from '../components/PresentationList';
import InputField from '../../../components/form-controls/InputField';
import presentationApi from '../../../api/presentationApi';

const useStyles = makeStyles(() => ({
    root: {},

    left: {
        width: '250px',
    },

    right: {
        flex: '1 1 0',
    },

}));

function ListPresentationPage() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const schema = yup.object().shape({
        name: yup.string().required('Please enter name.')
    });
    const form = useForm({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(schema),
    });
    const { isSubmitting } = form.formState

    const [openDialogCreatePresentation, setDialogCreatePresentation] = useState(false);

    const handleCloseDialogCreatePresentation = () => {
        setDialogCreatePresentation(false);
    };
    const handleClickOpenDialogCreatePresentation = () => {
        setDialogCreatePresentation(true);
    };
    const handleSendInviteClick = async () => {
        handleClickOpenDialogCreatePresentation();
    };

    const [presentation, setPresentation] = useState({});
    const handleSubmitCreatePresentation = async (values) => {
        try {
            const response = await presentationApi.createPresentation(values);

            if (response.status === true) {
                enqueueSnackbar("Send presentation successfully!!", {
                    variant: "success",
                    autoHideDuration: 1000
                });
                setPresentation(response)
            } else {
                enqueueSnackbar("Send presentation fail", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            enqueueSnackbar("Send presentation fail", {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    };


    const schemaDelete = yup.object().shape({
        id: yup.string().required('Please enter id.')
    });
    const formDelete = useForm({
        defaultValues: {
            id: '',
        },
        resolver: yupResolver(schemaDelete),
    });
    const { isSubmittingDelete } = form.formState
    const [openDialogDeletePresentation, setOpenDialogDeletePresentation] = useState(false);

    const handleCloseDialogDeletePresentation = () => {
        setOpenDialogDeletePresentation(false);
    };
    const handleClickOpenDialogDeletePresentation = () => {
        setOpenDialogDeletePresentation(true);
    };
    const handleDeletePresentationClick = async () => {
        handleClickOpenDialogDeletePresentation();
    };

    const handleSubmitDeletePresentation = async (values) => {
        try {
            console.log(values)
            const response = await presentationApi.delete({
                id: values.id
            });

            if (response.status === true) {
                enqueueSnackbar("Delete presentation successfully!!", {
                    variant: "success",
                    autoHideDuration: 1000
                });
                setPresentation({})

            } else {
                enqueueSnackbar("Delete presentation fail", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            enqueueSnackbar("Delete presentation fail", {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    };

    const [presentationList, setPresentationList] = useState([]);
    const [loadingPresentationList, setLoadingPresentationList] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await presentationApi.getAllPresentations();
                setPresentationList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoadingPresentationList(false);
        })();
    }, [presentation]);

    // setLoading(false);
    return (
        <Box padding={3}>
            <Container>
                <Button onClick={handleSendInviteClick} sx={{ backgroundColor: '#afa98e', marginBottom: '20px' }}>
                    Create Presentation
                </Button>
                <Button onClick={handleDeletePresentationClick} sx={{ marginLeft: "20px", backgroundColor: '#afa98e', marginBottom: '20px' }}>
                    Delete Presentation
                </Button>
                <Grid container spacing={1}>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <PresentationList data={presentationList}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={openDialogCreatePresentation}
                onClose={handleCloseDialogCreatePresentation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <form onSubmit={form.handleSubmit(handleSubmitCreatePresentation)}>
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
                            Create
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogCreatePresentation} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDialogDeletePresentation}
                onClose={handleCloseDialogDeletePresentation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <form onSubmit={formDelete.handleSubmit(handleSubmitDeletePresentation)}>
                        <InputField name="id" label="ID" form={formDelete} />
                        {
                            isSubmittingDelete &&
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }

                        <Button sx={{
                            marginTop: 2,
                        }}
                            disabled={isSubmittingDelete} type="submit" variant="contained" color="primary" fullWidth>
                            Delete
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogDeletePresentation} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// ListPresentationPage.propPageTypes = {

// };

export default ListPresentationPage;