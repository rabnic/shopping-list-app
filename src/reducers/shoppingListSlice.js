import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload);
        },
        deleteItem: (state) => {

        },
        editItem: (state) => {

        },
    },
});

export const {addItem, deleteItem, editItem} = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;