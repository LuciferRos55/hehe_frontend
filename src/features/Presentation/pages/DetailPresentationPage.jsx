/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import PresentationInfo from '../components/PresentationInfo';



function DetailPresentationPage({socket}) {
    return (
        <Box padding={3}>
            <PresentationInfo socket={socket}/>
        </Box>
    );
}

DetailPresentationPage.propTypes = {
    socket: PropTypes.object,
};

export default DetailPresentationPage;