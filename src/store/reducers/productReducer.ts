import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchProducts from "../actions/getProduxts";
import { access } from "fs";
import axios from "axios";

export type TRate = {
    rate: number;
    count: number;
};

export type TProduct = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: TRate;
};

type TInit = {
    loading: boolean;
    products: TProduct[] | null;
    error: null | string;
};

const initState: TInit = {
    loading: false,
    products: null,
    error: null,
};

export const productsSlice = createSlice({
    name: "products",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<TProduct[]>) => {
                    state.loading = false;
                    state.error = null;
                    state.products = action.payload;
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                if (axios.isAxiosError(action.payload)) {
                    state.error = action.payload.message;
                }
            });
    },
});

export default productsSlice.reducer;
