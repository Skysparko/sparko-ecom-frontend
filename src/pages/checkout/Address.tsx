import React, { SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressType, getAllAddresses } from "../../redux/address.slice";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  deleteAddress,
  setAddressDefault,
} from "../../utils/address.functions";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  itemCount: number;
  price: number;
};

export default function Address(props: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //getting user from redux store
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
  const { value: addresses, loading } = addressesState ?? {};

  const [showOtherAddress, setShowOtherAddress] = React.useState(false);
  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllAddresses());
  }, []);

  const addressCount = addresses.length;

  return (
    <article className="grid grid-cols-[1fr,0.2fr] gap-10 max-xl:-mx-10 max-lg:-mx-14  max-md:grid-cols-1 max-sm:-mx-8 max-vxs:-mx-4">
      {!(addressCount === 0) ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold ">Your Addresses</h1>
          <section className="flex gap-5">
            {/* if the user address is in the address list then that address will be added to the card  */}

            <label htmlFor={user.address} className="w-full cursor-pointer">
              {addresses.map(
                (item, i) =>
                  item._id === user.address && (
                    <div
                      key={i}
                      className="flex w-full  items-center gap-5 rounded-md border-2 border-gray-500 bg-white p-5  shadow"
                    >
                      <input
                        type="radio"
                        name="address"
                        className=" cursor-pointer border  border-black"
                        id={user.address}
                        defaultChecked
                      />
                      {/* fetched info for address */}
                      <div className=" grid h-full grid-rows-[1fr,0.1fr]  items-center gap-5 ">
                        <span className="flex flex-wrap gap-2">
                          <h1 className="border-r-2 border-black  pr-4 ">
                            Default Address
                          </h1>
                          <h1 className="font-semibold">{item.fullName}</h1>
                          <h2>{item.address1}</h2>
                          <h2>{item.address2}</h2>
                          <h2>
                            {item.city},{item.state} {item.pinCode}
                          </h2>
                          <h2>{item.country}</h2>
                          <h2>Phone Number:{item.mobileNumber}</h2>
                        </span>
                        {/* actions button  */}
                        <span className="flex gap-2 ">
                          {/* edit address button */}
                          <button
                            className="text-sky-700"
                            onClick={() =>
                              navigate(`edit-address?address=${item._id}`)
                            }
                          >
                            Edit
                          </button>
                          <span>|</span>
                          {/* delete address button  */}
                          <button
                            className="text-sky-700"
                            onClick={() => deleteAddress(item._id)}
                          >
                            Remove
                          </button>
                        </span>
                      </div>
                    </div>
                  )
              )}
            </label>
          </section>
          {showOtherAddress && (
            <>
              {addresses.map(
                (item, i) =>
                  item._id !== user.address && (
                    // fetched info for address
                    <section key={i} className="flex gap-5">
                      <label
                        htmlFor={item._id}
                        className="w-full cursor-pointer"
                      >
                        <div className="flex w-full gap-5 rounded-md border-2  border-gray-500 bg-white p-5  shadow">
                          <input
                            type="radio"
                            name="address"
                            className="cursor-pointer"
                            id={item._id}
                          />

                          <div className="grid h-full grid-rows-[1fr,0.1fr] gap-5 ">
                            <span className="flex flex-wrap gap-2">
                              <h1 className="font-semibold">{item.fullName}</h1>
                              <h2>{item.address1}</h2>
                              <h2>{item.address2}</h2>
                              <h2>
                                {item.city},{item.state} {item.pinCode}
                              </h2>
                              <h2>{item.country}</h2>
                              <h2>Phone Number:{item.mobileNumber}</h2>
                            </span>
                            {/* action buttons  */}
                            <span className=" flex items-center gap-2 ">
                              {/* edit button  */}
                              <button
                                className="text-sky-700"
                                onClick={() =>
                                  navigate(`edit-address?address=${item._id}`)
                                }
                              >
                                Edit
                              </button>
                              <span>|</span>
                              {/* remove address  */}
                              <button
                                className="text-sky-700"
                                onClick={() => deleteAddress(item._id)}
                              >
                                Remove
                              </button>
                              <span>|</span>
                              {/* set as default address  */}
                              <button
                                className="text-sky-700"
                                onClick={() => setAddressDefault(item._id)}
                              >
                                Set as Default
                              </button>
                            </span>
                          </div>
                        </div>
                      </label>
                    </section>
                  )
              )}
              <section>
                <div
                  className=" cursor-pointer rounded-md border-[3px] border-dashed border-gray-500 bg-white p-5 shadow-lg"
                  onClick={() => navigate("/user/addresses/add-address")}
                >
                  <span className="flex h-full flex-col items-center justify-center">
                    <span className="flex items-center  gap-5">
                      <AiOutlinePlus
                        color="rgb(107 114 128 /1)"
                        className=" m-auto  rounded-full border-2 border-gray-500 p-1 text-3xl"
                      />
                      <h2 className="text-center text-xl font-medium text-gray-700">
                        Add Addresses
                      </h2>
                    </span>
                  </span>
                </div>
              </section>
            </>
          )}

          <span className="m-auto flex gap-2 max-xs:flex-col">
            <button
              className="rounded border border-gray-400 bg-white px-5  py-2 shadow "
              onClick={(e) => {
                setShowOtherAddress(true);
                (e.target as HTMLButtonElement).style.display = "none";
              }}
            >
              Change
            </button>
            <button
              className="rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow "
              onClick={() => {
                props.setActiveStep(2);

                props.setSelectedAddress(
                  `${
                    document.querySelector("input[name='address']:checked")?.id
                  }`
                );
              }}
            >
              Use This Address
            </button>
          </span>
        </div>
      ) : (
        <div
          className=" cursor-pointer rounded-md border-[3px] border-dashed border-gray-500 bg-white p-5 shadow-lg"
          onClick={() => navigate("/user/addresses/add-address")}
        >
          <span className="flex h-full flex-col items-center justify-center">
            <span className="flex items-center  gap-5">
              <AiOutlinePlus
                color="rgb(107 114 128 /1)"
                className=" m-auto  rounded-full border-2 border-gray-500 p-1 text-3xl"
              />
              <h2 className="text-center text-xl font-medium text-gray-700">
                Add Addresses
              </h2>
            </span>
          </span>
        </div>
      )}
      <div className="flex max-h-80 w-72 flex-col rounded border border-gray-400 bg-white p-5 shadow max-md:hidden ">
        <button
          className="rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow "
          onClick={() => {
            props.setActiveStep(2);

            props.setSelectedAddress(
              `${document.querySelector("input[name='address']:checked")?.id}`
            );
          }}
        >
          Use This Address
        </button>
        <p className="border-b border-gray-400 p-3 text-xs">
          Choose a shipping address and payment method to calculate shipping,
          handling and tax.
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
