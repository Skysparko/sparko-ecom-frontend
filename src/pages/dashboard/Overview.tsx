import React from "react";

import users from "../../assets/images/dashboard/overview/man.png";
import orders from "../../assets/images/dashboard/overview/online-shopping.png";
import sales from "../../assets/images/dashboard/overview/pie-chart.png";
import profit from "../../assets/images/dashboard/overview/profits.png";

export default function Dashboard() {
  return (
    <article className="bg-gray-100 p-5">
      <span className="mb-14 flex flex-col gap-3">
        <h1 className=" text-5xl font-semibold">Overview</h1>
        <p>A Overview page for your dashboard panel.</p>
      </span>
      <main className="grid grid-rows-3 ">
        <div className="flex  justify-evenly ">
          <section className="flex  w-56 gap-5 rounded-md bg-white p-5 shadow-md">
            <img src={orders} alt="total orders" className="h-10 w-10" />
            <span>
              <h3 className="text-sm">Total Orders</h3>
              <h2 className="text-lg font-semibold">0</h2>
            </span>
          </section>
          <section className="flex w-56 gap-5 rounded-md bg-white p-5 shadow-md">
            <img src={users} alt="total orders" className="h-10 w-10" />
            <span>
              <h3 className="text-sm">Total Customers</h3>
              <h2 className="text-lg font-semibold">0</h2>
            </span>
          </section>
          <section className="flex w-56 gap-5 rounded-md bg-white p-5 shadow-md">
            <img src={profit} alt="total orders" className="h-10 w-10" />
            <span>
              <h3 className="text-sm">Total Profit</h3>
              <h2 className="text-lg font-semibold">0</h2>
            </span>
          </section>
          <section className="flex w-56 gap-5 rounded-md bg-white p-5 shadow-md">
            <img src={sales} alt="total orders" className="h-10 w-10" />
            <span>
              <h3 className="text-sm">Total Sales</h3>
              <h2 className="text-lg font-semibold">0</h2>
            </span>
          </section>
        </div>
        <div></div>
        <div></div>
      </main>
    </article>
  );
}
