import React, { useEffect, useLayoutEffect, useState } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import Payment from "../pages/checkout/Payment";
import Address from "../pages/checkout/Address";
import Review from "../pages/checkout/Review";
import { getCartItemCount, getTotalPriceWithOffer } from "../utils/functions";
import { useSelector } from "react-redux";
import { cartType } from "../redux/cart.slice";
import { productType } from "../redux/product.slice";
import { getSelectedItemsTotalAndCount } from "../utils/cart.functions";

export type productsListType = {
  productID: string;
  quantity: number;
};

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");

  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [selectedCartItems, setSelectedCartItems] = React.useState<
    Array<string>
  >([""]);

  const [itemCount, setItemCount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  // const [price, setPrice] = React.useState(0);

  const [isCart, setIsCart] = React.useState(false);

  const cartState = useSelector(
    (state: { cart: { value: Array<cartType>; loading: boolean } }) =>
      state.cart
  );
  const { value: cartItems } = cartState ?? {};

  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  //logic for responsive design
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  const [productsList, setProductsList] = useState<Array<productsListType>>([
    { productID: "", quantity: 0 },
  ]);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p")!;
    const cart = new URLSearchParams(window.location.search).get("cart")!;
    const cartIds = id.split("X").filter((i) => i !== "");
    console.log(cartIds);
    if (cart) {
      let { count, subTotal } = getSelectedItemsTotalAndCount(
        cartItems,
        products,
        cartIds
      );
      let data: Array<productsListType> = [];
      setSelectedCartItems(cartIds);
      cartItems.map((item) => {
        cartIds.includes(item._id) &&
          data.push({ productID: item.productID, quantity: item.quantity });
      });
      console.log(data);
      setProductsList(data);
      setIsCart(true);
      setItemCount(count);
      setPrice(subTotal);
    } else {
      const items = id;
      setProductsList([
        {
          productID: items,
          quantity: quantity,
        },
      ]);
      setSelectedProduct(items);
      setItemCount(1);

      products.find((product) => {
        product._id === items &&
          setPrice(
            Math.round(product.price - (product.offer / 100) * product.price) *
              quantity
          );
      });
    }
    setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
  }, [products, cartItems, quantity]);

  return (
    <div className="max-md: bg-gray-100 py-10 px-20 max-sm:px-12 max-vxs:px-6 ">
      <MultiStepForm
        activeStep={activeStep}
        accentColor="rgb(2 132 199 / 1)"
        style={{ padding: 200 }}
      >
        <Step label={`${width > 350 ? "Delivery Address" : "Delivery"}`}>
          <Address
            setActiveStep={setActiveStep}
            setSelectedAddress={setSelectedAddress}
            itemCount={itemCount}
            price={price}
          />
        </Step>
        <Step label={`${width > 350 ? "Payment Method" : "Payment"}`}>
          <Payment
            setActiveStep={setActiveStep}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            itemCount={itemCount}
            price={price}
          />
        </Step>
        <Step label={`${width > 350 ? "Order Review" : "Order"}`}>
          <Review
            setActiveStep={setActiveStep}
            selectedAddress={selectedAddress}
            selectedPaymentMethod={selectedPaymentMethod}
            activeStep={activeStep}
            itemCount={itemCount}
            price={price}
            isCart={isCart}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedProduct={selectedProduct}
            selectedCartItems={selectedCartItems}
            productsList={productsList}
          />
        </Step>
      </MultiStepForm>
    </div>
  );
}
