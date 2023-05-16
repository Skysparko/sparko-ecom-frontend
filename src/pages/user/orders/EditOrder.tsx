import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addressType, getAllAddresses } from "../../../redux/address.slice";
import { useDispatch, useSelector } from "react-redux";
import { orderType } from "../../../redux/order.slice";
import { AppDispatch } from "../../../redux/store";
import { productType } from "../../../redux/product.slice";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../../../utils/order.functions";

export default function EditOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);

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
        address: string;
      };
    }) => state.user
  );
  // getting addresses from redux store
  const addressesState = useSelector(
    (state: { address: { value: Array<addressType>; loading: boolean } }) =>
      state.address
  );
  const { value: addresses } = addressesState ?? {};

  const ordersState = useSelector(
    (state: { order: { value: Array<orderType>; loading: boolean } }) =>
      state.order
  );
  const { value: orders, loading } = ordersState ?? {};

  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products } = productsState ?? {};

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const id = new URLSearchParams( `?${window.location.href.split("?")[1]}`).get("order")!;
    setOrderId(id);
    let quantity = 0;
    orders.find((order) => {
      order._id === id &&
        order.products.map((product) => (quantity += product.quantity));
    });
    setTotalQuantity(quantity);

    dispatch(getAllAddresses());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <>
      {orders.map(
        (order, index) =>
          order._id === orderId && (
            <article
              className="flex flex-col gap-5 bg-gray-100 p-5 max-xs:px-0"
              key={index}
            >
              <h1 className="px-5 text-3xl font-semibold drop-shadow">
                Order Details
              </h1>
              <header className="flex justify-around border-2 border-gray-400 bg-white p-5 shadow  max-sm:flex-col max-sm:gap-5 max-sm:text-center ">
                {addresses.map(
                  (address, index) =>
                    address._id === order.addressID && (
                      <span
                        className="flex  flex-col flex-wrap  gap-2  max-sm:border-b max-sm:pb-5"
                        key={index}
                      >
                        {/* fetched info for address */}
                        <h2 className="text-lg font-semibold text-gray-600">
                          Shipping address
                        </h2>
                        <h2>{address.address1}</h2>
                        <h2>{address.address2}</h2>
                        <h2>
                          {address.city},{address.state} {address.pinCode}
                        </h2>
                        <h2>{address.country}</h2>
                        <h2>Phone Number:{address.mobileNumber}</h2>
                      </span>
                    )
                )}

                <span className="flex  flex-col flex-wrap  gap-2 max-sm:border-b max-sm:pb-5">
                  <h2 className="text-lg font-semibold text-gray-600">
                    Payment method
                  </h2>
                  <h2>{order.payment}</h2>
                </span>
                <span className="flex flex-col  flex-wrap gap-1  text-center ">
                  <h2 className="text-lg font-semibold text-gray-600">
                    Order Summary
                  </h2>
                  <section className="flex flex-col gap-3 py-2">
                    <div className="flex flex-col gap-3  ">
                      <span className="flex justify-between  gap-14 max-sm:gap-5">
                        <h3>Price({totalQuantity} Items):</h3>
                        <h3>₹ {order.price}</h3>
                      </span>
                      <span className="flex justify-between gap-14 max-sm:gap-5">
                        <h3>Delivery</h3>
                        <h3>Free</h3>
                      </span>
                    </div>
                    <div className="flex justify-between  text-lg font-semibold text-green-700">
                      <h3>Order Total </h3>
                      <h3>: ₹ {order.price}</h3>
                    </div>
                  </section>
                </span>
              </header>
              <main className="flex justify-between  gap-5 rounded border-2   border-gray-400  bg-white p-5 shadow max-md:flex-col">
                <div className="flex flex-col  gap-5 ">
                  <span className="flex flex-col">
                    <h3 className="text-xl font-semibold ">Arriving Sunday</h3>
                    <p className="text-green-700">Not dispatched Yet</p>
                  </span>
                  <span className="flex flex-col gap-5 px-5">
                    {order.products.map((ref, index) =>
                      products.map(
                        (product, i) =>
                          ref.productID === product._id && (
                            <span
                              className="flex items-center gap-5 "
                              key={index}
                            >
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="h-14 w-14 object-contain"
                              />

                              <span className="flex flex-col gap-2">
                                <h3 className="line-clamp-1">
                                  {product.title}
                                </h3>
                                <span className="flex gap-1 text-sm">
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
                                <h3 className="text-sm">
                                  Quantity: {ref.quantity}
                                </h3>
                              </span>
                            </span>
                          )
                      )
                    )}
                  </span>
                </div>
                <div className=" flex flex-col justify-center gap-3 pr-10 text-sm  max-md:p-0">
                  <button
                    className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
                    onClick={() => deleteOrder(orderId)}
                  >
                    Cancel order
                  </button>
                </div>
              </main>
            </article>
          )
      )}
    </>
  );
}
