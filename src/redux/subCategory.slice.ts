import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";
import { fetchAllSubCategories } from "../utils/categories.functions";

//calling api to get all Products of the authorized user
export const getAllSubCategories = createAsyncThunk(
  "subcategories/getAll",
  fetchAllSubCategories
);

export interface subcategoryType {
  _id: string;
  categoryID: string;
  name: string;
  description: string;
}

const subCategorySlice = createSlice({
  name: "subCategory",
  //initial state of the sub category
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllSubCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSubCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default subCategorySlice.reducer;
