/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
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
import Slide from '../Slide';

function SlideList() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation
            modules={[Keyboard, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Slide variant="h3" marginTop={8}/>
            </SwiperSlide>
            <SwiperSlide>
                <Slide variant="h3" marginTop={8}/>
            </SwiperSlide>
        </Swiper>
    );
};

export default SlideList;