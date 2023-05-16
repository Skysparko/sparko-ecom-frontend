import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addressType } from "../../redux/address.slice";
import { addItemToCart, removeItemFromCart } from "../../utils/cart.functions";
import { productType } from "../../redux/product.slice";
import { cartType } from "../../redux/cart.slice";
import { newOrder } from "../../utils/order.functions";
import { TailSpin } from "react-loader-spinner";
import { productsListType } from "../../components/Checkout";

// type productsListType = {
//   productID: string;
//   quantity: number;
// };

type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: string;
  selectedPaymentMethod: string;

  activeStep: number;
  itemCount: number;
  price: number;
  isCart: boolean;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedProduct: string;
  selectedCartItems: Array<string>;
  productsList: Array<productsListType>;
};

export default function Review(props: Props) {
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
  const [orderEmail, setOrderEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  // getting addresses from redux store
  const addressesState = useSelector(
    (state: { address: { value: Array<addressType>; loading: boolean } }) =>
      state.address
  );
  const { value: addresses, loading } = addressesState ?? {};

  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products } = productsState ?? {};

  const cartState = useSelector(
    (state: { cart: { value: Array<cartType>; loading: boolean } }) =>
      state.cart
  );
  const { value: cartItems } = cartState ?? {};

  // const [productsList, setProductsList] = useState<Array<productsListType>>([
  //   { productID: "", quantity: 0 },
  // ]);

  useEffect(() => {
    // let data: Array<productsListType> = [];
    // if (props.isCart) {
    //   cartItems.map((item) => {
    //     props.selectedCartItems.includes(item._id) &&
    //       data.push({ productID: item.productID, quantity: item.quantity });
    //   });
    //   setProductsList(data);
    //   console.log(data);
    // } else {
    //   setProductsList([
    //     {
    //       productID: props.selectedProduct,
    //       quantity: props.quantity,
    //     },
    //   ]);
    // }
    console.log(props.productsList);
  }, []);

  return (
    <article className="grid grid-cols-[1fr,0.2fr] gap-10 max-xl:-mx-10 max-lg:-mx-14  max-md:grid-cols-1 max-sm:-mx-8 max-vxs:-mx-4">
      <div>
        <h1 className="text-2xl font-semibold ">Review Your Order</h1>
        <div className="mt-3 flex flex-col gap-5 rounded border-2 border-gray-600 bg-white  p-5 shadow">
          <section className="flex flex-col gap-2 border-b border-gray-500 pb-5">
            <h2 className="text-lg font-semibold text-gray-600">Contact </h2>
            <span className="flex justify-between gap-3 pl-5 max-sm:pl-0 max-vs:flex-col">
              <input
                type="email"
                defaultValue={user.email}
                onChange={(e) => setOrderEmail(e.target.value)}
                readOnly
                className="p-2 read-only:p-0"
                pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
                id="order_email"
              />
              <label
                htmlFor="order_email"
                onClick={() => {
                  document
                    .querySelector("#order_email")!
                    .removeAttribute("readonly");
                }}
                className="cursor-pointer  rounded text-sm font-semibold  text-sky-700 "
              >
                Change
              </label>
            </span>
          </section>
          <section className="flex flex-col gap-3 border-b border-gray-500 pb-5">
            <h2 className="text-lg font-semibold text-gray-600">Ship To</h2>
            <span className="flex justify-between gap-3 pl-5 max-sm:pl-0 max-vs:flex-col">
              {addresses.map(
                (item, i) =>
                  item._id === props.selectedAddress && (
                    <div key={i} className="inline-flex  flex-wrap gap-2  ">
                      {/* fetched info for address */}

                      <h1 className="font-semibold">{item.fullName}</h1>
                      <h2>{item.address1}</h2>
                      <h2>{item.address2}</h2>
                      <h2>
                        {item.city},{item.state} {item.pinCode}
                      </h2>
                      <h2>{item.country}</h2>
                      <h2>Phone Number:{item.mobileNumber}</h2>
                    </div>
                  )
              )}
              <button
                onClick={() => {
                  props.setActiveStep(1);
                }}
                className="cursor-pointer  rounded text-sm font-semibold  text-sky-700 "
              >
                Change
              </button>
            </span>
          </section>
          <section className="flex flex-col gap-2 border-b border-gray-500 pb-5">
            <h2 className="text-lg font-semibold text-gray-600">
              Payment Method
            </h2>
            <span className="flex justify-between gap-3 pl-5 max-sm:pl-0 max-vs:flex-col">
              <h3>{props.selectedPaymentMethod}</h3>
              <button
                onClick={() => {
                  props.setActiveStep(1);
                }}
                className="cursor-pointer  rounded text-sm font-semibold  text-sky-700 "
              >
                Change
              </button>
            </span>
          </section>
          <section className="flex flex-col gap-2 border-b border-gray-500 pb-5">
            <h2 className="text-lg font-semibold text-gray-600">Products</h2>
            <span>
              {props.isCart === true
                ? cartItems.map(
                    (item, index) =>
                      props.selectedCartItems.includes(item._id) &&
                      products.map(
                        (product, i) =>
                          product._id === item.productID && (
                            <div
                              key={index}
                              className="flex gap-5 border-b p-5 max-vs:text-base  max-xs:flex-col max-vxs:px-0"
                            >
                              <img
                                src={product.images[0]}
                                alt=""
                                className="h-28 w-28 rounded border border-gray-200 object-contain shadow max-vs:m-auto"
                              />
                              <section className="flex flex-col gap-2 max-vs:m-auto">
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
                  )
                : products.map(
                    (product, i) =>
                      props.selectedProduct === product._id && (
                        <div
                          key={i}
                          className="flex gap-5 border-b p-5 max-vs:flex-col  max-vs:px-0 max-vs:text-base"
                        >
                          <img
                            src={product.images[0]}
                            alt=""
                            className="h-28 w-28 rounded border border-gray-200 object-contain shadow max-vs:m-auto"
                          />
                          <section className="flex flex-col gap-2 max-vs:m-auto">
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
                                    if (props.quantity > 1) {
                                      props.setQuantity(props.quantity - 1);
                                      // window.location.reload();
                                    }
                                  }}
                                  className="rounded border-r border-gray-400 px-2 shadow"
                                >
                                  -
                                </button>
                                <h5>{props.quantity}</h5>
                                <button
                                  onClick={() => {
                                    props.setQuantity(props.quantity + 1);
                                    // window.location.reload();
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
                  )}
            </span>
          </section>
          <section className="flex items-center justify-between max-vs:flex-col-reverse max-vs:gap-3">
            {isLoading ? (
              <button className=" mx-5 flex w-[10.3rem] justify-center rounded border border-gray-400 bg-sky-700 px-5  py-2 text-sky-700 shadow  max-md:m-0">
                <TailSpin
                  height="24"
                  width="24"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </button>
            ) : (
              <button
                className="mx-5 rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow  max-md:m-0  "
                onClick={() =>
                  newOrder(
                    props.isCart,
                    props.productsList,
                    props.selectedAddress,
                    orderEmail,
                    props.selectedPaymentMethod,
                    setIsLoading,
                    props.selectedCartItems,
                    props.price
                  )
                }
              >
                Place Your Order
              </button>
            )}

            <div className="inline-flex justify-between   text-xl font-semibold text-green-700  max-sm:text-lg">
              <h3>Order Total: ₹ {props.price}</h3>
            </div>
          </section>
        </div>
      </div>
      <div className="flex max-h-80 w-72 flex-col rounded border border-gray-400 bg-white p-5 shadow max-md:hidden ">
        {isLoading ? (
          <button className="flex justify-center rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow">
            <TailSpin
              height="24"
              width="24"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button>
        ) : (
          <button
            className="rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow "
            onClick={() => {
              newOrder(
                props.isCart,
                props.productsList!,
                props.selectedAddress,
                orderEmail,
                props.selectedPaymentMethod,
                setIsLoading,
                props.selectedCartItems,
                props.price
              );
            }}
          >
            Place Your Order
          </button>
        )}
        <p className="border-b border-gray-400 p-3 text-xs">
          By placing your order, you agree to Sstore's privacy notice and
          conditions of use.
        </p>
        <h2 className="py-3 text-xl ">
          <b>Order Summary </b>
        </h2>
        <div className="flex flex-col gap-2 border-b border-gray-500 px-2 pb-3 text-sm">
          <span className="flex justify-between ">
            <h3>Price({props.itemCount} Items):</h3>
            <h3>₹ {props.price}</h3>
          </span>
          <span className="flex justify-between ">
            <h3>Delivery</h3>
            <h3>Free</h3>
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-500 py-3 px-2 text-lg font-semibold text-green-700">
          <h3>Order Total:</h3>
          <h3>₹ {props.price}</h3>
        </div>
      </div>
    </article>
  );
}
