/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const useStyles = makeStyles(() => ({
    root: {},


    link: {
        "text-decoration": "none",
        "color": "black"
    },

    left: {
        flex: '1 1 0'
    },

    right: {
        flex: '0 0 1'
    }
}));

function Member({ member }) {
    const classes = useStyles();

    return (
        <Stack direction='row'>
            <Box className={classes.left} padding={1} marginTop={1} sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}  >
                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="h5">{member.user_id.name} : {member.user_id.email} : {member.role_id.name}</Typography>
            </Box>
            <ButtonGroup className={classes.right} sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}>
                <IconButton aria-label='promote' color='default'>
                    <KeyboardDoubleArrowUpIcon/>
                </IconButton>
                <IconButton aria-label='demote' color='default'>
                    <KeyboardDoubleArrowDownIcon/>
                </IconButton>
            </ButtonGroup>
        </Stack>

    );
}

Member.propTypes = {
    member: PropTypes.object,
};

Member.defaultProps = {
    member: {},
}

export default Member;