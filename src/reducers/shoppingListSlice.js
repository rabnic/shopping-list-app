import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
}

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addList: (state, action) => {
            state.value = {...state.value, [action.payload.id]: action.payload}
        },
        addItem: (state, action) => {
            const [listKey, item] = action.payload;
            console.log(listKey);
            console.log(item);
            console.log(state.value);
            // const updatedItems = state.value[listKey].items;
            // updatedItems.push(item);

            // state.value[listKey] = {...state.value[listKey], items: updatedItems}
        },
        deleteItem: (state) => {

        },
        editItem: (state) => {

        },
    },
});

export const {addList, addItem, deleteItem, editItem} = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;