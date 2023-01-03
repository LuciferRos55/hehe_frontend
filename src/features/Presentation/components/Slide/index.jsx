/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import Swiper core and required modules
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Box, Container, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import MultipleChoice from '../Chart/multipleChoice';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slide({ variant, marginTop, labels, datas, question, code }) {
    return (
        <Box>
            <Box marginTop={marginTop}>
                <Typography align="center" variant={variant}>
                    {code}
                </Typography>
                <Typography align="center" variant={variant}>
                    {question}
                </Typography>
            </Box>
            <Box marginTop={marginTop}>
                <Container>
                    <MultipleChoice labels={labels} datas={datas} />
                </Container>
            </Box>
        </Box>
    );
};

Slide.propTypes = {
    variant: PropTypes.string.isRequired,
    marginTop: PropTypes.number.isRequired,
    labels: PropTypes.array,
    datas: PropTypes.array,
    question: PropTypes.string,
    code: PropTypes.number,
};

Slide.defaultProps = {
    labels: ["Option 1", "Option 2", "Option 3", "Option 4"],
    datas: [0, 0, 0, 0],
    question: "Any question",
    code: 0
}

export default Slide;