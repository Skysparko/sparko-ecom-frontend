import React from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer(): JSX.Element {
  return (
    // footer's main section
    <div className="border border-black  text-center text-sm text-white max-sm:text-xs ">
      {/* This division contains a row when its clicked it scroll back to top */}
      <div
        className="flex cursor-pointer items-center justify-center gap-5 bg-sky-800 py-3 text-base hover:bg-sky-700 max-sm:gap-2 max-sm:text-sm"
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        Back to top
        <IoIosArrowUp />
      </div>
      {/* This division contains a row with three cols containing links like this: social , About and help links */}
      <div className="flex w-full justify-evenly bg-sky-900 py-4 max-sm:gap-5">
        {/* This col contains information about website and owner */}
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Get to Know us
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>About us</li>
            <li>Contact us</li>
            <li>SStore Stories</li>
          </ul>
        </span>
        {/* This col contains social link  */}
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Connect with Us
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </span>
        {/* This col contain help related links and information */}
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Let Us Help You
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
          </ul>
        </span>
      </div>
      {/* This division contains two rows one have illegal documents and the other
      one have copyright information */}
      <div className="bg-slate-700 py-2">
        <span>
          <ul className="flex  justify-center gap-5 py-2">
            <li>Condition of Use</li>
            <li>Privacy Notice</li>
            <li>Interest Based Ads</li>
          </ul>
        </span>
        <span className="">&copy; Skysparko.pvt.lmt ,2023</span>
      </div>
    </div>
  );
}
