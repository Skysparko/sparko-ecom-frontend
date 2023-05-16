import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function OrderPlaced() {
  const navigate = useNavigate();
  return (
    <div className=" flex  h-[70vh] items-center  justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-10 rounded border border-gray-400 bg-white p-6 text-center shadow max-vxs:px-3">
        <span className=" flex flex-col gap-2">
          <span className="flex items-center gap-2 text-3xl font-semibold text-green-600 max-vxs:text-2xl">
            <span className=" 500 inline-flex rounded-full bg-green-500 p-2 text-lg max-vxs:text-base">
              <GiCheckMark color="white" />
            </span>
            <h1>Order placed, thank you!</h1>
          </span>
          <p className="text-gray-600 max-vxs:text-sm">
            Confirmation will be sent to your email.
          </p>
        </span>
        <span className=" flex gap-2 max-vs:flex-col max-vxs:text-sm">
          <button
            className="rounded border border-gray-400 px-5 py-2 shadow"
            onClick={(e) => {
              navigate("/user/orders");
            }}
          >
            Go to your orders
          </button>
          <button
            className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
            onClick={(e) => {
              navigate("/");
            }}
          >
            Continue shopping
          </button>
        </span>
      </div>
    </div>
  );
}
