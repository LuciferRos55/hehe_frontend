/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Member from '../Member';


function GroupMemberList({ data }) {
    return (
        <Box>
            {data.map((member) => (
                <div key={member.user_id._id}>
                    <Member member={member} />
                </div>
            ))}
        </Box>
    );
}

GroupMemberList.propTypes = {
    data: PropTypes.array,
};

GroupMemberList.defaultProps = {
    data: [],
}

export default GroupMemberList;