import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: "header",
    initialState: true,
    reducers: {
        setMode(state) {
            return !state;
        }
    },
});

const { actions, reducer} = headerSlice;
export const { setMode } = actions;
export default reducer;