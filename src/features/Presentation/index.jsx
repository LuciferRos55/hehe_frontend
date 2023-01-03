/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListPresentationPage from './pages/ListPresentationPage';
import DetailPresentationPage from './pages/DetailPresentationPage';
import SlideList from './components/SlideList';




function PresentationFeature({socket}) {
    return (
        <div>
            <Routes>
                <Route path="" exact element={<ListPresentationPage/>}/>
                <Route path="/:presentationId/slide" exact element={<SlideList/>}/>

                <Route path="/:presentationId" exact element={<DetailPresentationPage socket={socket}/>}/>
            </Routes>
        </div>
    );
}

PresentationFeature.propTypes = {
    socket: PropTypes.object,
};

export default PresentationFeature;