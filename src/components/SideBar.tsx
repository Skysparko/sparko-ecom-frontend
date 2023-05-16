import React from "react";
import { RxCross1, RxDashboard } from "react-icons/rx";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.functions";
import { BiEdit, BiLogOut } from "react-icons/bi";
import {
  MdHelpOutline,
  MdOutlineLocationOn,
  MdOutlinePayments,
  MdOutlineShoppingBag,
} from "react-icons/md";

const closeSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("-left-80");
  document.getElementById("header__sidebar")?.classList.remove("left-0");
};

export const openSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("left-0");
  document.getElementById("header__sidebar")?.classList.remove("-left-80");
};

export default function SideBar() {
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
  const navigate = useNavigate();
  return (
    <div
      id="header__sidebar"
      className=" absolute -left-80 top-0 z-10 flex text-xl  transition-all duration-500 ease-in-out"
    >
      <section className=" relative flex h-screen flex-col justify-between border border-black bg-white shadow">
        <div>
          <header className="flex w-60 flex-wrap items-center justify-center gap-2 overflow-hidden border border-black p-3 shadow">
            <img
              src={user.pfp}
              alt={user.name}
              className="h-10 w-10 rounded-full object-contain"
            />
            <h1 className="text-center font-semibold drop-shadow">
              Hi, {user.name}
            </h1>
          </header>
          <main>
            <ul className="text-base">
              {user.isAuthenticated && user.role === "owner" && (
                <li className="flex items-center gap-2 border-b   p-3 ">
                  <RxDashboard />
                  <Link to="/dashboard">My Dashboard</Link>
                </li>
              )}
              <li className="flex items-center gap-2  p-4 ">
                <FaRegUserCircle />
                <Link to="/account">My Account</Link>
              </li>
              <li className="flex items-center gap-2 border-y p-4 ">
                <BiEdit />
                <Link to="/user">Edit Profile</Link>
              </li>

              <li className="flex items-center gap-2  p-4 ">
                <MdOutlineShoppingBag />
                <Link to="/user/orders">Orders</Link>
              </li>
              <li className="border- flex items-center gap-2 border-y p-4 ">
                <MdOutlinePayments />
                <Link to="/user/payment">Payment Options</Link>
              </li>
              <li className="flex items-center gap-2  p-4 ">
                <MdOutlineLocationOn />
                <Link to="/user/addresses">Manage Addresses</Link>
              </li>
              <li className="flex items-center gap-2 border-y p-4 ">
                <MdHelpOutline />

                <Link to="/user/help">Help</Link>
              </li>
              <li
                className="flex cursor-pointer items-center  gap-2 p-4 "
                onClick={logout}
              >
                <BiLogOut />
                Logout
              </li>
            </ul>
          </main>
        </div>
        <footer className="border border-gray-400 text-center text-sm shadow">
          &copy; Skysparko.pvt.lmt ,2023
        </footer>
      </section>
      <button
        className=" absolute right-2 top-2 cursor-pointer  self-start font-semibold text-red-700 drop-shadow"
        onClick={closeSidebar}
      >
        <RxCross1 size={"1rem"} />
      </button>
    </div>
  );
}
