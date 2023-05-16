import React from "react";
import { useNavigate } from "react-router-dom";
import emptyOrders from "../../../assets/video/orders.gif";

export default function EmptyOrders() {
  const navigate = useNavigate();
  return (
    <section className=" border border-black bg-slate-100 p-10 max-lg:p-5 max-vxs:p-0">
      <h1 className="mb-5 text-5xl">Your Orders</h1>
      <div className="flex flex-col items-center justify-evenly gap-10 bg-white p-10 shadow-lg  max-vxs:p-5 ">
        <img src={emptyOrders} className="w-[30rem] max-lg:w-[25rem]" />
        <section className="flex flex-col gap-10 ">
          <h1 className="text-5xl font-semibold max-lg:text-4xl max-vs:text-3xl">
            Looks like you haven't placed an order
          </h1>
          <span className="flex justify-between max-lg:flex-col max-lg:gap-5">
            <button
              onClick={() => navigate("/")}
              className="m-auto w-48 rounded border-2 border-black py-2 max-lg:text-sm"
            >
              Continue Shopping
            </button>
          </span>
        </section>
      </div>
    </section>
  );
}
