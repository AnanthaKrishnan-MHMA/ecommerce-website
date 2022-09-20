import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState = {
    products: {},
    resultPerPage: 0,
    productsCount: 0,
    product: {},
    loading: true,
    error: null,
}
export const fetchProducts = createAsyncThunk(
    'products/fetchData',
    async ({keyword="",activePage=1}) => {
        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${activePage}`);
        console.log(`/api/v1/products?keyword=${keyword}&page=${activePage}`);
        return data;
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
    reducers: {
        clearProduct: function (state, action) {
            state.product = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.resultPerPage = action.payload.resultPerPage;
            state.productsCount = action.payload.productsCount;
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
export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
