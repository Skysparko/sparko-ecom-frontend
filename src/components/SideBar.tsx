import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

const closeSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("-left-80");
  document.getElementById("header__sidebar")?.classList.remove("left-0");
};

export const openSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("left-0");
  document.getElementById("header__sidebar")?.classList.remove("-left-80");
};

export default function SideBar() {
  return (
    <div
      id="header__sidebar"
      className=" absolute -left-80 top-0 flex text-xl transition-all  duration-500 ease-in-out "
    >
      <section className="border border-black bg-white">
        <header className="flex w-60 items-center gap-2 border border-black py-3 pl-3">
          <FaUserCircle />
          <h1 className="  text-[1.3rem]">Register & Login</h1>
        </header>
        <main>
          <ul>
            <li className="border border-black">test</li>
            <li className="border border-black">test</li>
            <li className="border border-black">test</li>
          </ul>
        </main>
        <footer className="border border-black">footer</footer>
      </section>
      <button className="cursor-pointer self-start" onClick={closeSidebar}>
        <RxCross1 />
      </button>
    </div>
  );
}
