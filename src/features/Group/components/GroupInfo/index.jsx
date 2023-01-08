/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import GroupMemberList from '../GroupMemberList';
import groupApi from '../../../../api/groupApi';

const useStyles = makeStyles(() => ({
    root: {},

    boxOne: {
        "borderRadius": "10px 10px"
    },

    boxTwo: {
        "borderRadius": "10px 10px"
    },

    link: {
        "text-decoration": "none",
        "color": "black"
    }
}));

function GroupInfo({ groupInfo }) {
    const classes = useStyles();
    const [memberList, setMemberList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { group, data } = groupInfo;

    let groupName = "";
    let onwerName = "";
    let desc ="";
    let groupId = "";
    if (group) {
        groupName = group.data.name;
        groupId = group.data._id;
        desc = group.data.description;

    }
    if (data) {
        onwerName = data[0].user_id.name;
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getAllGroupMembers(groupId);
                setMemberList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, [groupId]);


    return (
        <Box>
            <Box padding={1} className={classes.boxOne} sx={{ border: 1, backgroundColor: '#afa98e' }}>
                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="h5">{groupName}</Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }}>Owner Group: {onwerName}</Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }}>Description: {desc}</Typography>
            </Box>
            <Box className={classes.boxTwo} marginTop={3}>
                <GroupMemberList data={memberList} />
            </Box>
        </Box>
    );
}

GroupInfo.propTypes = {
    groupInfo: PropTypes.object,
};

GroupInfo.defaultProps = {
    groupInfo: {},
}

export default GroupInfo;