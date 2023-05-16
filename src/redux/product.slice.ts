import { fetchAllProducts } from "./../utils/product.functions";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";

//calling api to get all Products of the authorized user
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  fetchAllProducts
);

export interface productType {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  images: Array<string>;
  tags: Array<string>;
  status: string;
  stock: number;
  offer: number;
  date: string;
  freeDelivery: boolean;
  cashOnDelivery: boolean;
  returnPolicy: boolean;
  returnDuration: number;
  warranty: boolean;
  warrantyDuration: number;
  sizeList: Array<string>;
}

const productSlice = createSlice({
  name: "product",
  //initial state of the product
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
