/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import groupApi from '../../../api/groupApi';
import InputField from '../../../components/form-controls/InputField';
import GroupInfo from '../components/GroupInfo';

const useStyles = makeStyles(() => ({
    root: {},

    left: {
        width: '300px',
    },

    right: {
        flex: '1 1 0',
    }
}));

function DetailPage(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Please enter email.').email('Please enter a valid email address.'),
    });
    const form = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    });
    const { isSubmitting } = form.formState

    const classes = useStyles();
    const { groupId } = useParams();

    const [group, setGroup] = useState({});
    const [loading, setLoading] = useState(true);

    const [inviteLink, setInviteLink] = useState("");
    const [openDialogCreateInviteLink, setDialogCreateInviteLink] = useState(false);
    const [openDialogSendInviteLink, setDialogSendInviteLink] = useState(false);
    const [openDialogConfirm, setDialogConfirm] = useState(false);
    const navigate = useNavigate();

    const handleCloseDialogConfirm = () => {
        setDialogConfirm(false);
    };
    const handleClickOpenDialogConfirm = () => {
        setDialogConfirm(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await groupApi.deleteGroup(groupId);
            navigate('/groups')
        } catch (error) {
            console.log("fail");
        }

    };

    const handleCloseDialogCreateInviteLink = () => {
        setDialogCreateInviteLink(false);
    };
    const handleClickOpenDialogCreateInviteLink = () => {
        setDialogCreateInviteLink(true);
    };
    const handleCreateInviteClick = async () => {
        try {
            const response = await groupApi.getInviteGroupLink(groupId);

            const inviteLinkFE = `${process.env.REACT_APP_URL}/invite/${groupId}`
            if (response.data) {
                setInviteLink(inviteLinkFE);
                handleClickOpenDialogCreateInviteLink();
            }
        } catch (error) {
            console.log("fail");
        }

    };

    const { enqueueSnackbar } = useSnackbar();

    const handleCloseDialogSendInviteLink = () => {
        setDialogSendInviteLink(false);
    };
    const handleClickOpenDialogSendInviteLink = () => {
        setDialogSendInviteLink(true);
    };
    const handleSendInviteClick = async () => {
        handleClickOpenDialogSendInviteLink();
    };
    const handleSubmitSendInviteLink = async (values) => {
        try {
            const response = await groupApi.sendInviteGroupLink({
                group_id: groupId,
                email: values.email,
            });

            if (response.status === true) {
                enqueueSnackbar("Send mail successfully!!", {
                    variant: "success",
                    autoHideDuration: 1000
                });
            } else {
                enqueueSnackbar("Send mail fail", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            enqueueSnackbar("Send mail fail", {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    };



    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getGroupDetail(groupId);
                console.log(response)
                setGroup(response);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, []);

    const loggedInUser = useSelector(state => state.user.current)
    const { data } = group;
    let isOwnerGroup = false;
    if (data) {
        isOwnerGroup = (loggedInUser._id === group.data[0].user_id._id)
    }

    return (
        <Box padding={3}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item className={classes.left}>
                        <Box sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}>
                            <IconButton disabled={!isOwnerGroup} color="inherit" onClick={handleCreateInviteClick}>
                                <LibraryAddIcon fontSize='large' />
                                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="subtitle1"> : Create link invite</Typography>
                            </IconButton>
                        </Box>

                        <Box marginTop={2} sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}>
                            <IconButton disabled={!isOwnerGroup} color="inherit" onClick={handleSendInviteClick}>
                                <SendIcon fontSize='large' />
                                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="subtitle1"> : Send link invite</Typography>
                            </IconButton>
                        </Box>

                        <Box marginTop={2} sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}>
                            <IconButton disabled={!isOwnerGroup} color="inherit" onClick={handleClickOpenDialogConfirm}>
                                <DeleteIcon fontSize='large' />
                                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="subtitle1"> : Delete group</Typography>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item className={classes.right}>
                        <GroupInfo groupInfo={group} />
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={openDialogCreateInviteLink}
                onClose={handleCloseDialogCreateInviteLink}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {inviteLink}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogCreateInviteLink} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDialogSendInviteLink}
                onClose={handleCloseDialogSendInviteLink}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <form onSubmit={form.handleSubmit(handleSubmitSendInviteLink)}>
                        <InputField name="email" label="Email" form={form} />
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
                            Send
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogSendInviteLink} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openDialogConfirm}
                onClose={handleCloseDialogConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Typography component="h3" variant="h5">
                        Are you sure?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    
                    <Button variant='contained' color='error' onClick={handleConfirmDelete} >
                        Yes
                    </Button>
                    <Button variant='outlined' onClick={handleCloseDialogConfirm} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>


    );
}

// DetailPage.propTypes = {

// };

export default DetailPage;