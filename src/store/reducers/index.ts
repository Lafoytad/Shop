import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
});
