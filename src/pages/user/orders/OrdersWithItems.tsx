import React, { useEffect } from "react";
import { orderType } from "../../../redux/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchAllOrders } from "../../../utils/order.functions";
import { addressType, getAllAddresses } from "../../../redux/address.slice";
import { AiOutlineDown } from "react-icons/ai";
import { productType } from "../../../redux/product.slice";
import { useNavigate } from "react-router-dom";

export default function OrdersWithItems() {
  const navigate = useNavigate();
  const ordersState = useSelector(
    (state: { order: { value: Array<orderType>; loading: boolean } }) =>
      state.order
  );
  const { value: orders, loading } = ordersState ?? {};
  // getting addresses from redux store
  const addressesState = useSelector(
    (state: { address: { value: Array<addressType>; loading: boolean } }) =>
      state.address
  );
  const { value: addresses } = addressesState ?? {};
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products } = productsState ?? {};
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllAddresses());
    // dispatch(getAllProducts());
  }, [dispatch, ordersState]);

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 max-vs:px-2 max-xs:px-0">
      <h1 className="text-3xl font-semibold drop-shadow">Your Orders</h1>
      {orders.map((item, i) => (
        <article key={i} className="rounded border border-black shadow">
          <header className="flex justify-between gap-5 rounded-t border border-gray-400 bg-sky-50 p-5 max-md:flex-col max-vs:px-0">
            <div className="flex gap-14 max-md:justify-evenly max-md:gap-3 max-xs:flex-col max-xs:text-center">
              <span className="flex flex-col gap-1 text-sm">
                <h3>ORDER PLACED</h3>
                <h3>{`${item.date.toString().split("T")[0]}`}</h3>
              </span>
              <span className="flex flex-col gap-1 text-sm">
                <h3>TOTAL</h3>
                <h3>₹ {item.price}</h3>
              </span>
              <span className="flex flex-col gap-1 text-sm">
                <h3>SHIP TO</h3>

                {addresses.map(
                  (address, key) =>
                    address._id === item.addressID && (
                      <details key={key} className="">
                        <summary className=" cursor-pointer text-blue-700">
                          {address.fullName}
                          {/* <AiOutlineDown /> */}
                        </summary>
                        <span className="absolute  flex-col flex-wrap  gap-1 rounded border border-gray-300 bg-white p-2 shadow  ">
                          {/* fetched info for address */}

                          <h2>{address.address1}</h2>
                          <h2>{address.address2}</h2>
                          <h2>
                            {address.city},{address.state} {address.pinCode}
                          </h2>
                          <h2>{address.country}</h2>
                          <h2>Phone Number:{address.mobileNumber}</h2>
                        </span>
                      </details>
                    )
                )}
              </span>
            </div>
            <span className="flex flex-col gap-1 text-sm max-md:text-center ">
              <h3>ORDER # {item._id}</h3>
              <span className=" flex justify-between px-5 text-center text-blue-700">
                <button
                  className="w-full cursor-pointer border-r border-gray-400 max-md:w-1/2"
                  onClick={() => navigate("edit?order=" + item._id)}
                >
                  View order details
                </button>
                <p className="w-1/2 cursor-pointer ">Invoice</p>
              </span>
            </span>
          </header>
          <main className="flex justify-between gap-5 rounded-b  border  border-gray-400 bg-white p-5 max-md:flex-col">
            <div className="flex flex-col  gap-5 ">
              <span className="flex flex-col">
                <h3 className="text-xl font-semibold ">Arriving Sunday</h3>
                <p className="text-green-700">Not dispatched Yet</p>
              </span>
              <span className="flex flex-col gap-5 px-5">
                {item.products.map((ref, index) =>
                  products.map(
                    (product, i) =>
                      ref.productID === product._id && (
                        <span className="flex items-center gap-5 " key={index}>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-14 w-14 object-contain"
                          />
                          <span>
                            <h3 className="line-clamp-1">{product.title}</h3>
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
                onClick={() => navigate("edit?order=" + item._id)}
              >
                View or edit order
              </button>
            </div>
          </main>
        </article>
      ))}
    </div>
  );
}
