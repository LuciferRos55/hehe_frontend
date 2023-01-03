/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {
    
};

function CounterFeature(props) {
    const dispatch = useDispatch();
    const count = useSelector(state => state.count)

    const handleIncreaseClick = () => {
        const action = increase();
        dispatch(action);
    };

    const handleDecreaseClick = () => {
        const action = decrease();
        dispatch(action);
    };

    return (
        <div>
            Coutner: {count}
            <div>
                <button type="submit" onClick={handleIncreaseClick}>Increase</button>
                <button type="submit" onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;