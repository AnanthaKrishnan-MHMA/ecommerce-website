import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState = {
    products: [],
    product: {},
    loading: true,
    error: null,
}
export const fetchProducts = createAsyncThunk(
    'products/fetchData',
    async () => {
        const {data} = await axios.get("/api/v1/products");
        return data.products;
    }
)
export const fetchProductDetails = createAsyncThunk(
    'product/fetchData',
    async (prodId) => {
        const { data } = await axios.get(`/api/v1/product/${prodId}`);
        return data.product;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        }).addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
            state.error = "oops,something went wrong!, Please try again..."
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        }).addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.loading = false;
            state.error = "oops,something went wrong!, Please try again..."
        })
    }
});

export default productsSlice.reducer;
