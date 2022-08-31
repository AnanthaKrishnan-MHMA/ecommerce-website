import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const allProductsUrl = "http://192.168.1.105:5000/api/v1/products";

let initialState = {
    products: [],
    loading: true,
    error: null,
}
export const fetchProducts = createAsyncThunk(
    'products/fetchStatus',
    async () => {
        const response = await axios.get(allProductsUrl);
        return response.data.products;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = "oops,something went wrong!, Please try again..."
        })
    }
});
export default productsSlice.reducer;
