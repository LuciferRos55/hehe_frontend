import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';
import headerReducer from '../components/Header/headerSlice';
import groupReducer from '../features/Group/groupSlice';

const rootReducer = {
    count: counterReducer,
    user: userReducer,
    header: headerReducer,
    group: groupReducer,
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;