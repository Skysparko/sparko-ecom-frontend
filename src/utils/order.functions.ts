import { cartType } from "../redux/cart.slice";
import { deleteAllItemsInCart, removeItemFromCart } from "./cart.functions";
import { instance } from "./functions";

export const newOrder = (
  isCart: boolean,
  products: Array<{ productID: string; quantity: number }>,
  addressID: string,
  contact: string,
  payment: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: Array<string>,
  price: number
) => {
  setIsLoading(true);
  console.log(products, addressID, contact, payment, cartItems);
  instance
    .post("/order/create", {
      products,
      addressID,
      contact,
      payment,
      cartItems,
      price,
    })
    .then((res) => {
      setIsLoading(false);
      location.href = "/order-placed";
    })
    .catch((error) => {
      setIsLoading(false);
      console.log("error creating order", error);
    });
};

export async function fetchAllOrders() {
  try {
    const res = await instance.get("/order");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function deleteOrder(orderId: string) {
  instance
    .delete("/order/" + orderId)
    .then((res) => {
      console.log(res);
      window.location.href = "/user/orders";
    })
    .catch((error) => {
      console.log("error deleting order", error);
    });
}
