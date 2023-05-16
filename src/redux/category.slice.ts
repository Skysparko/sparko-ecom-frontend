import { fetchAllCategories } from "../utils/categories.functions";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";

//calling api to get all Products of the authorized user
export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  fetchAllCategories
);

export interface categoryType {
  _id: string;
  name: string;
  description: string;
}

const categorySlice = createSlice({
  name: "category",
  //initial state of the category
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default categorySlice.reducer;
