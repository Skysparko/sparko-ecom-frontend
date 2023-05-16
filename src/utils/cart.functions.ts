import { cartType } from "../redux/cart.slice";
import { productType } from "../redux/product.slice";
import { instance } from "./functions";
export const addItemToCart = (productID: string) => {
  instance
    .post("/cart/add", { productID })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchAllCartItems = async () => {
  try {
    const res = await instance.get("/cart");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeItemFromCart = (cartID: string) => {
  instance
    .delete(`/cart/${cartID}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteAllItemsInCart = () => {
  instance
    .delete(`/cart/empty`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSelectedItemsTotalAndCount = (
  cartItems: Array<cartType>,
  products: Array<productType>,
  cartIds: Array<string>
) => {
  let total = 0;
  let count = 0;
  let subTotal = 0;
  cartItems.map((item) => {
    if (cartIds.includes(item._id)) {
      count += item.quantity;

      products.map((product) => {
        if (product._id === item.productID) {
          subTotal +=
            Math.round(product.price - (product.offer / 100) * product.price) *
            item.quantity;
          total += product.price * item.quantity;
        }
      });
    }
  });
  return { subTotal, count, total };
};
