/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import { Box, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import groupApi from '../../../api/groupApi';
import GroupList from '../components/GroupList';
import GroupSkeletonList from '../components/GroupSkeletonList';

const useStyles = makeStyles((theme) => ({
    root: {},

    left: {
        width: '250px',
    },

    right: {
        flex: '1 1 0',
    },

}));

function ListPage({ trigger }) {
    const classes = useStyles();
    const stateCallApiGetAllGroup = useSelector(state => state.group)

    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getAllGroups();
                setGroupList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, [stateCallApiGetAllGroup]);

    return (
        <Box padding={3}>
            {/* <Container> */}
            <Grid container spacing={1}>
                <Grid item className={classes.right}>
                    <Paper elevation={0}>
                        {loading ? <GroupSkeletonList length={6} /> : <GroupList data={groupList} />}
                    </Paper>
                </Grid>
            </Grid>
            {/* </Container> */}
        </Box>
    );
}

ListPage.propTypes = {
    trigger: PropTypes.bool,
};

ListPage.defaultProps = {
    trigger: false,
}

export default ListPage;