import React from "react";
import orders from "../assets/images/MyAccount/orders.png";
import address from "../assets/images/MyAccount/address.png";
import payment from "../assets/images/MyAccount/payment.png";
import help from "../assets/images/MyAccount/help.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyAccount() {
  const navigate = useNavigate();
  //getting user info from redux store
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
  return (
    // This article contains the following sections
    <article className="bg-gray-100 px-60 pb-10 max-lg:px-28 max-md:px-10 max-sm:px-24 max-vs:px-10">
      <h1 className="py-5 text-3xl">Hey,{user.name}</h1>
      <div className="grid grid-cols-2 grid-rows-3 gap-10 max-sm:grid-cols-1">
        {/* user profile section with image , title and desc to navigate to the respected page*/}
        <section
          className="flex cursor-pointer gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-lg hover:bg-slate-100 max-xl:flex-col max-xl:items-center"
          onClick={() => navigate("/user")}
        >
          <img src={user.pfp} alt="profile" className="h-28 w-28 rounded-md" />
          <span className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl">My Profile</h2>
            <p className="text-sm text-gray-800">
              You can edit your profile and login settings.
            </p>
          </span>
        </section>
        {/* orders section with image , title and desc  to navigate to the respected page*/}

        <section
          className="flex cursor-pointer gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-lg hover:bg-slate-100 max-xl:flex-col max-xl:items-center"
          onClick={() => navigate("/user/orders")}
        >
          <img src={orders} alt="orders" className="h-28 w-28 rounded-md" />
          <span className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl">Orders</h2>
            <p className="text-sm text-gray-800">
              You can manage and track your orders and also you can buy again.
            </p>
          </span>
        </section>
        {/* payment section with image , title and desc to navigate to the respected page */}

        <section
          className="flex cursor-pointer gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-lg hover:bg-slate-100 max-xl:flex-col max-xl:items-center"
          onClick={() => navigate("/user/payment")}
        >
          <img
            src={payment}
            alt="payment Options"
            className="h-28 w-28 rounded-md"
          />
          <span className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl">Payment Options</h2>
            <p className="text-sm text-gray-800">
              You can add or edit your payment methods.
            </p>
          </span>
        </section>
        {/* addresses section with image , title and desc to navigate to the respected page */}

        <section
          className="flex cursor-pointer gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-lg hover:bg-slate-100 max-xl:flex-col max-xl:items-center"
          onClick={() => navigate("/user/addresses")}
        >
          <img
            src={address}
            alt="Manage Addresses"
            className="h-28 w-28 rounded-md"
          />
          <span className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl">Manage Addresses</h2>
            <p className="text-sm text-gray-800">
              You can add or edit your addresses and also you can select a
              default address too.
            </p>
          </span>
        </section>
        {/* help section with image , title and desc to navigate to the respected page */}

        <section
          className="flex cursor-pointer gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-lg hover:bg-slate-100 max-xl:flex-col max-xl:items-center"
          onClick={() => navigate("/user/help")}
        >
          <img src={help} alt="Help" className="h-28 w-28 rounded-md" />
          <span className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl">Help</h2>
            <p className="text-sm text-gray-800">
              Stuck on something or you need any help ? contact us.
            </p>
          </span>
        </section>
      </div>
    </article>
  );
}
