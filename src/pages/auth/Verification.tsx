import React, { useEffect, useState } from "react";
import { instance } from "../../utils/functions";
import { Link } from "react-router-dom";
import verified from "../../assets/images/verified.png";
import { verifyEmailAuth } from "../../utils/auth.functions";

export default function Verification() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    //getting token from params in url
    const token = new URLSearchParams(window.location.search).get("token")!;
    //verifying email address
    verifyEmailAuth(token, setResponse);
  }, []);
  return (
    // this return a block with image response and login button
    <div className="flex flex-col justify-center gap-5 rounded-md  border border-gray-200 bg-white p-5 shadow-lg max-vs:w-[90%]">
      {/* verified image */}
      <img
        src={verified}
        alt="Congrats Message"
        className="m-auto h-56 w-56 max-md:h-52 max-md:w-52 max-sm:h-48 max-sm:w-48 max-vs:h-44 max-vs:w-44 max-xs:h-40 max-xs:w-40 max-vxs:h-36 max-vxs:w-36"
      />
      {/* here response is shown */}
      <h1 className="text-2xl font-semibold  max-vs:text-xl">{response}</h1>
      {/* button to go back to the login page */}
      <Link
        to="/authentication"
        className="m-auto rounded bg-sky-700 px-5 py-2 text-lg text-white max-sm:text-base  max-vs:text-sm"
      >
        Login
      </Link>
    </div>
  );
}
