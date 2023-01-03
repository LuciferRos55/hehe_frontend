/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

// GroupFeature.propTypes = {
    
// };

function GroupFeature(props) {

    return (
        <div>
            <Routes>
                <Route path="" exact element={<ListPage/>}/>
                <Route path="/:groupId" exact element={<DetailPage/>}/>
            </Routes>
        </div>
    );
}

export default GroupFeature;