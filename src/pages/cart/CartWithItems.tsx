import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartType, getAllCartItems } from "../../redux/cart.slice";
import { getAllProducts, productType } from "../../redux/product.slice";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import {
  addItemToCart,
  fetchAllCartItems,
  getSelectedItemsTotalAndCount,
  removeItemFromCart,
} from "../../utils/cart.functions";
import { useState } from "react";
import EmptyCart from "./EmptyCart";
import {
  getCartItemCount,
  getTotalPriceWithOffer,
  getTotalPriceWithoutOffer,
} from "../../utils/functions";
import { useNavigate } from "react-router-dom";

export default function CartWithItems() {
  // getting cartItems from redux store
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

  const navigate = useNavigate();

  const [change, setChange] = useState(true);
  const [total, setTotal] = useState(
    getTotalPriceWithoutOffer(cartItems, products)
  );
  const [subTotal, setSubTotal] = useState(
    getTotalPriceWithOffer(cartItems, products)
  );
  const [itemCount, setItemCount] = useState(getCartItemCount(cartItems));

  const [selectedItems, setSelectedItems] = useState<Array<string>>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
      };
    }) => state.user
  );

  useEffect(() => {
    const data = document.querySelectorAll("input[name=products]:checked");

    const items: Array<string> = [];
    for (let index = 0; index < data.length; index++) {
      items.push(data[index].id);
    }
    setSelectedItems(items);
    console.log(items);
    const { total, count, subTotal } = getSelectedItemsTotalAndCount(
      cartItems,
      products,
      selectedItems
    );
    setSubTotal(subTotal);
    setTotal(total);
    setItemCount(count);
  }, [cartItems, products, change]);

  return (
    <article className="bg-gray-100 px-10 max-md:px-5 max-sm:px-2 max-vs:px-0 ">
      <h1 className="p-5 pb-0 text-4xl font-semibold max-xl:text-3xl max-vs:text-2xl">
        Your Cart
      </h1>
      <section className="max-rows-2 grid grid-cols-[3fr,1fr] max-lg:grid-cols-1 ">
        <div
          id="cart_items"
          className="m-5 flex flex-col gap-5 rounded border border-gray-400 bg-white p-5 shadow max-vs:mx-3 max-xs:mx-0 max-xs:py-2 max-xs:px-0"
        >
          <h1 className="p-5 pb-0 text-2xl font-medium underline underline-offset-8 max-md:p-4 max-sm:p-2 max-vs:p-0 max-vs:pl-3 max-vs:text-xl">
            Cart Items
          </h1>
          {cartItems.map((item, index) =>
            products.map(
              (product, i) =>
                product._id === item.productID && (
                  <div
                    key={index}
                    className="flex gap-5 border-b  p-5 max-vs:flex-col  max-vs:text-sm "
                  >
                    <span className="flex gap-5">
                      <input
                        type="checkbox"
                        name="products"
                        id={item._id}
                        defaultChecked
                        className="cursor-pointer"
                        onChange={() => {
                          const data = document.querySelectorAll(
                            "input[name=products]:checked"
                          );
                          setChange(!change);

                          const items: Array<string> = [];
                          for (let index = 0; index < data.length; index++) {
                            items.push(data[index].id);
                          }
                          setSelectedItems(items);
                          console.log(items);
                          // window.location.reload();
                        }}
                      />
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-28 w-28 rounded border border-gray-200 object-contain shadow max-md:h-20 max-md:w-20"
                      />
                    </span>
                    <section className="flex flex-col gap-2 ">
                      <h1 className="font-medium line-clamp-1">
                        {product.title}
                      </h1>
                      <span className="flex gap-1">
                        <h4>Price: ₹</h4>

                        {product.offer > 0 ? (
                          <>
                            <h4 className="text-red-700 line-through">{`${product.price}`}</h4>
                            <h4 className="">{`${Math.round(
                              product.price -
                                (product.offer / 100) * product.price
                            )}`}</h4>
                          </>
                        ) : (
                          <h4 className="">{`${product.price}`}</h4>
                        )}
                      </span>
                      <span className="flex gap-1 ">
                        <label htmlFor="quantity">Quantity:</label>
                        <section className="flex gap-2 rounded border border-gray-400">
                          <button
                            onClick={() => {
                              removeItemFromCart(item._id);
                              window.location.reload();
                            }}
                            className="rounded border-r border-gray-400 px-2 shadow"
                          >
                            -
                          </button>
                          <h5>{item.quantity}</h5>
                          <button
                            onClick={() => {
                              addItemToCart(product._id);
                              window.location.reload();
                            }}
                            className="rounded border-l border-gray-400 px-2 shadow"
                          >
                            +
                          </button>
                        </section>
                      </span>
                    </section>
                  </div>
                )
            )
          )}
          <div className="-mt-5 flex items-center justify-end gap-2 border-t-2 border-black pt-3 max-vs:border-t max-vs:pr-3">
            <h3 className=" pb-0 text-xl font-medium max-vs:text-lg ">
              SubTotal ({itemCount} items) :-
            </h3>
            <h3 className="text-xl max-vs:text-lg">₹ {subTotal}</h3>
          </div>
        </div>
        <div>
          <section className="m-5 flex flex-col gap-5 rounded border border-gray-400 bg-white shadow max-xs:mx-0">
            <h1 className="border-b border-gray-300 px-5 py-2 text-xl max-xl:text-lg max-vs:text-base ">
              PRICE DETAILS
            </h1>
            <span className="flex justify-between px-5 text-lg max-xl:text-base ">
              <h2 className="">Price ({itemCount} items)</h2>
              <h2 className=" ">₹ {total}</h2>
            </span>

            <span className="flex justify-between px-5 text-lg max-xl:text-base">
              <h2 className="">Discount</h2>
              <h2 className=" text-green-600">- ₹ {total - subTotal}</h2>
            </span>

            <span className="flex justify-between px-5 text-lg max-xl:text-base">
              <h2 className="">Delivery Charges</h2>
              <h2 className=" text-green-600">FREE</h2>
            </span>

            <span className="mx-3 flex justify-between border-y border-gray-300 py-3 px-2 text-xl max-xl:text-lg">
              <h2 className="">
                <b>Total Amount</b>
              </h2>
              <h2 className="">
                <b>₹ {subTotal}</b>
              </h2>
            </span>

            <p className="text-center text-green-700">
              You will save ₹ {total - subTotal} on this order
            </p>

            {/* proceed to pay button */}
            <button
              className=" m-5 mt-0 rounded border  border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
              onClick={() => {
                const products = document.querySelectorAll(
                  "input[name=products]:checked"
                );
                let query = "";
                for (let index = 0; index < products.length; index++)
                  query += products[index].id + "X";
                navigate(`/checkout?cart=true&p=${query}`);
              }}
            >
              Proceed to Buy
            </button>
          </section>
        </div>
      </section>
      <section className="grid ">
        <div className="m-5 flex flex-col gap-3 rounded border border-gray-400 bg-white p-5 shadow max-xs:mx-0">
          <h3 className="text-xl ">
            <b>Ecommerce Policies and Terms:</b>
          </h3>
          <ul className="flex flex-col gap-3 px-5">
            <li>
              <b>Shipping policy:</b> "Please note that our shipping times may
              vary based on your location and the shipping method you select."
            </li>
            <li>
              <b>Return policy:</b> "We offer a hassle-free return policy. If
              you are not satisfied with your purchase, you can return it if
              return is available on that item."
            </li>
            <li>
              <b>Privacy policy:</b> "We take your privacy seriously. All of
              your personal information is securely stored and will never be
              shared with third parties."
            </li>
            <li>
              <b>Payment policy:</b> "We accept all major credit cards and
              PayPal. Your payment information is securely processed and
              protected."
            </li>
            <li>
              <b>Terms and conditions:</b> "By placing an order, you agree to
              our terms and conditions. Please read them carefully before
              completing your purchase."
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
