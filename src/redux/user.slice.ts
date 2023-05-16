import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface user {
  email: string;
  isAuthenticated: boolean;
  name: string;
  gender: string;
  role: string;
  id: string;
  pfp: string;
  address: string;
}

const userSlice = createSlice({
  name: "user",
  // initial state for this slice
  initialState: {
    email: "",
    isAuthenticated: false,
    name: "",
    gender: "",
    role: "",
    id: "",
    pfp: "",
    address: "",
  },
  //reducers function to add or delete the data from the store
  reducers: {
    //to add the user data to the store
    addUserData(state, { payload }: PayloadAction<user>) {
      state.name = payload.name;
      state.isAuthenticated = payload.isAuthenticated;
      state.email = payload.email;
      state.gender = payload.gender;
      state.role = payload.role;
      state.id = payload.id;
      state.pfp = payload.pfp;
      state.address = payload.address;
    },
    //to remove the user data from  the store

    removeUserData(state, { payload }: PayloadAction<user>) {
      state.name = "";
      state.isAuthenticated = false;
      state.email = "";
      state.gender = "";
      state.role = "";
      state.id = "";
      state.pfp = "";
      state.address = "";
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
