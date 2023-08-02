import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "../reducers/shoppingListSlice";

export const store = configureStore({
    reducer: {
        shopping: shoppingReducer,
    }
});