import axios from "axios";
import { dialogBoxPropsType } from "../components/utils/DialogBox";
import { cartType } from "../redux/cart.slice";
import { productType } from "../redux/product.slice";
//this function take name as parameter and return its value
export const getCookie = (cookieName: string) => {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith(cookieName));

  return cookie ? cookie.split("=")[1] : "";
};

//axios instance method for api requests
export const instance = axios.create({
  baseURL: "https://sparko-ecom-backend-production.up.railway.app/api/v1",
  // baseURL: "http://localhost:8080/api/v1",
  headers: {
    authorization: `Bearer ${getCookie("bearerToken")}`,
  },
  withCredentials: true,
});

//This function is Use to toggle password Show and Hide it accepts two variable from useState hook and string like this (#id) for password input id
export const passwordViewToggler = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  setShowPassword(!showPassword);
  const password: HTMLInputElement | null = document.querySelector(id)!;
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

export function getCartItemCount(cartItems: Array<cartType>) {
  return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0);
}

export function getTotalPriceWithOffer(
  cartItems: Array<cartType>,
  products: Array<productType>
) {
  let total = 0;
  cartItems.map((item) =>
    products.map(
      (product) =>
        product._id === item.productID &&
        (total +=
          Math.round(product.price - (product.offer / 100) * product.price) *
          item.quantity)
    )
  );
  return total;
}

export function getTotalPriceWithoutOffer(
  cartItems: Array<cartType>,
  products: Array<productType>
) {
  let total = 0;
  cartItems.map((item) =>
    products.map(
      (product) =>
        product._id === item.productID &&
        (total += product.price * item.quantity)
    )
  );
  return total;
}
