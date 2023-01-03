/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {},

    boxOne: {
        "border-top-left-radius": "10px 10px",
        "border-top-right-radius": "10px 10px"
    },

    boxTwo: {
        "border-bottom-left-radius": "10px 10px",
        "border-bottom-right-radius": "10px 10px"
    },

    link: {
        "text-decoration": "none",
        "color": "black"
    }
}));

function Group({ group }) {
    const classes = useStyles();

    return (
        <Link to={group.group_id._id} className={classes.link}>
            <Box>
                <Box padding={1} className={classes.boxOne} sx={{ border: 0.5, borderBottom: 0, backgroundColor: '#afa98e' }}>
                    <Typography noWrap sx={{ color: 'white', fontFamily: 'Monospace' }} variant="h5">{group.group_id.name}</Typography>
                    <Typography noWrap sx={{ color: 'white', fontFamily: 'Monospace' }}>{group.group_id.owner_name}</Typography>
                </Box>
                <Box padding={1} className={classes.boxTwo} sx={{ border: 0.5 }}>
                    <Box>
                        <img src="https://i.imgur.com/lGzYT1g.jpg" alt={group.group_id.name} width="100%" />
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}

Group.propTypes = {
    group: PropTypes.object,
};

Group.defaultProps = {
    group: {},
}

export default Group;