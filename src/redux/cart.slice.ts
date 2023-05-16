import { fetchAllCartItems } from "./../utils/cart.functions";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";

//calling api to get all CartItems of the authorized user
export const getAllCartItems = createAsyncThunk(
  "cart/getAll",
  fetchAllCartItems
);

export interface cartType {
  _id: string;
  userID: string;
  productID: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  //initial state of the cart
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllCartItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCartItems.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;
