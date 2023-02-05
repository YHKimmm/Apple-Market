import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sort: "popular",
};

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortItems: (state, action) => {
            state.sort = action.payload;
        }
    }
});

export const { setSortItems } = sortSlice.actions;

export default sortSlice.reducer;

