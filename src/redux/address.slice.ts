import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";
import { fetchUserAddress } from "../utils/address.functions";

//calling api to get all addresses of the authorized user
export const getAllAddresses = createAsyncThunk(
  "addresses/getAll",
  fetchUserAddress
);

export interface addressType {
  _id: string;
  userID: string;
  country: string;
  state: string;
  mobileNumber: string;
  fullName: string;
  pinCode: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
}

const addressSlice = createSlice({
  name: "address",
  //initial state of the address
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAddresses.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default addressSlice.reducer;
