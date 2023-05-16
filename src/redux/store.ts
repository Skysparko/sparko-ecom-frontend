import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import addressSlice from "./address.slice";
import productSlice from "./product.slice";
import categorySlice from "./category.slice";
import cartSlice from "./cart.slice";
import orderSlice from "./order.slice";
import subCategorySlice from "./subCategory.slice";

//configuration of the store
const store = configureStore({
  reducer: {
    order: orderSlice,
    user: userSlice,
    address: addressSlice,
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    subCategory: subCategorySlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
