import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "./productReducer";
import { clear } from "console";

type TInit = {
    cart: TProduct[] | [];
};

const initState: TInit = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        setCart(state, action: PayloadAction<TProduct>) {
            state.cart = [...state.cart, action.payload];
        },
        removeItem(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter(
                (item: TProduct) => item.id !== action.payload
            );
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

export default cartSlice.reducer;
