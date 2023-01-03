import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
    name: "group",
    initialState: true,
    reducers: {
        callApiGetListGroup(state) {
            return !state;
        }
    },
});

const { actions, reducer} = groupSlice;
export const { callApiGetListGroup } = actions;
export default reducer;