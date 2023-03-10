/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';

// export const register = createAsyncThunk('user/register', async (payload) => {
//     const data = await userApi.register(payload);

//     // save data to local storage
//     localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//     localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

//     return data.user;
// });

export const login = createAsyncThunk('user/login', async (payload) => {
    const { data } = await userApi.login(payload);
    console.log(data);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return data.user;
});


const counterSlice = createSlice({
    name: "user",
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            // clear local storage
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.USER);

            state.current = {};
        },
        update(state, action) {
            state.current = action.payload;
        },
    },
    extraReducers: {
        // [register.fulfilled]: (state, action) => {
        //     state.current = action.payload;
        // },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    }
});

const { actions, reducer } = counterSlice;
export const { logout, update } = actions;
export default reducer;