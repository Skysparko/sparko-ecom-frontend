import React, { useEffect } from "react";

import { Link, Outlet } from "react-router-dom";

export default function Authentication() {
  return (
    // This is the authentication page
    <article className="grid h-[100vh] grid-rows-[0.8fr,8fr,1.2fr]">
      {/* header for the page */}
      <header className="flex items-center border border-black bg-sky-900">
        <Link to="/" className="p-4 text-3xl text-white">
          SStore
        </Link>
      </header>
      {/* Main section containing register and login forms */}
      <main className="flex flex-col items-center justify-center  bg-gray-100">
        <Outlet />
      </main>

      {/* Footer for authentication page */}
      <footer className="flex flex-col items-center justify-evenly  border border-black bg-sky-900 text-center text-sm text-white max-vs:text-xs">
        {/* Illegal Stuff */}
        <span>
          <ul className="flex gap-5">
            <li>Condition of Use</li>
            <li>Privacy Notice</li>
            <li>Interest Based Ads</li>
          </ul>
        </span>
        {/* copyright section */}
        <span className="">&copy; Skysparko.pvt.lmt ,2023</span>
      </footer>
    </article>
  );
}
