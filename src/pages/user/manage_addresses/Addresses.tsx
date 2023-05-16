import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressType, getAllAddresses } from "../../../redux/address.slice";
import { AppDispatch } from "../../../redux/store";
import Products from "../../dashboard/products/Products";
import {
  deleteAddress,
  setAddressDefault,
} from "../../../utils/address.functions";

export default function Addresses() {
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
  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllAddresses());
  }, []);

  return (
    //this section contains add section card and cards for each address
    <div className="p-5">
      {/* title of the page */}
      <h1 className=" text-5xl font-semibold max-md:text-4xl max-vs:text-3xl">
        Manage Addresses
      </h1>

      {/* card for adding addresses  */}
      <section className="flex  flex-wrap justify-center gap-5  py-10 ">
        <div
          className=" w-80 cursor-pointer rounded-md border-[3px] border-dashed border-gray-500 bg-white p-5 shadow-lg"
          onClick={() => navigate("add-address")}
        >
          <span className="flex h-full flex-col items-center justify-center">
            <span className="flex flex-col gap-5">
              <AiOutlinePlus
                color="rgb(107 114 128 /1)"
                className=" m-auto  rounded-full border-2 border-dashed border-gray-500 p-1 text-5xl"
              />
              <h2 className="text-center text-xl font-medium text-gray-700">
                Add <br />
                Addresses
              </h2>
            </span>
          </span>
        </div>
        {/* if the user address is in the address list then that address will be added to the card  */}
        {addresses.map(
          (item, i) =>
            item._id === user.address && (
              <div
                key={i}
                className=" w-80 rounded-md  border-2 border-gray-500 bg-white p-5 pb-2 shadow-lg max-vxs:p-2"
              >
                {/* fetched info for address */}
                <div className=" grid h-full  grid-rows-[1fr,0.1fr] gap-5 ">
                  <span className="flex flex-col gap-2">
                    <h1 className="border-b border-black pb-2">
                      Default Address
                    </h1>
                    <h1 className="mt-3 font-semibold">{item.fullName}</h1>
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
        {/* populating all the addresses expect default one */}
        {addresses.map(
          (item, i) =>
            item._id !== user.address && (
              // fetched info for address

              <div
                key={i}
                className=" w-80 rounded-md border-2  border-gray-500 bg-white p-3 pb-2 shadow-lg max-vxs:p-2"
              >
                <div className="grid h-full grid-rows-[1fr,0.1fr] gap-5 ">
                  <span className="flex flex-col gap-2 align-top">
                    <h1 className="mt-3 font-semibold">{item.fullName}</h1>
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
            )
        )}
      </section>
    </div>
  );
}
