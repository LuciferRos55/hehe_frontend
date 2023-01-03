/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

function GroupSkeletonList({ length }) {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                        <Box padding={1}>
                            <Skeleton variant="rectangular" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

GroupSkeletonList.propTypes = {
    length: PropTypes.number,
};

GroupSkeletonList.defaultProps = {
    length: 6,
}

export default GroupSkeletonList;