import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Orders() {
  return (
    <article className="bg-gray-100 p-5">
      <header className="flex justify-between ">
        <h1 className="text-4xl font-semibold">Orders</h1>
        <button className="flex items-center justify-center gap-2 rounded-sm bg-sky-700 p-1 px-2 text-white shadow-lg">
          <AiOutlinePlus /> Create new
        </button>
      </header>
      <main className="mt-5 grid grid-rows-[1fr,9fr] rounded-lg bg-white">
        <div className="flex justify-between p-5 ">
          <input
            type="search"
            name="product_dashboard_search"
            id="product_dashboard_search"
            className="rounded border border-gray-500 p-2 shadow-md"
            placeholder="Search products here"
          />
          <span className="flex gap-5 text-center">
            <select
              name="status"
              id="status"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>

            {/* <label htmlFor="show">Show</label> */}
            <select
              name="show"
              id="show"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            {/* <label htmlFor="sort"> Date</label> */}
            <select
              name="sort"
              id="sort"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="today">today</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </span>
        </div>
        <div className="grid grid-cols-[1fr,3fr,2fr,2fr,2fr,2fr] border-t-2 border-gray-400 p-5 text-center">
          <section className="border ">ID</section>
          <section className="border ">Name</section>
          <section className="border ">Email</section>
          <section className="border ">Total</section>
          <section className="border ">Status</section>
          <section className="border ">Date</section>
        </div>
      </main>
    </article>
  );
}
