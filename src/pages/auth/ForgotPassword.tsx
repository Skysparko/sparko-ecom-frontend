import React, { useState } from "react";
import { FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import DialogBox, {
  dialogBoxPropsType,
} from "../../components/utils/DialogBox";
import { forgotPassword } from "../../utils/auth.functions";
import { TailSpin } from "react-loader-spinner";

export default function ForgotPassword() {
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  //response state
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "Please enter your registered email here ! ",
  });
  //email state
  const [email, setEmail] = useState("");
  return (
    <>
      {/* logo */}
      <span className="flex rounded-full bg-sky-100 p-3 ">
        <FiKey
          className="rounded-full bg-sky-200 p-3 text-5xl"
          color="#032e73"
        />
      </span>
      {/* information */}
      <span className="mt-7 mb-5 flex flex-col justify-center gap-5 p-2 text-center max-xs:mb-3 max-xs:mt-5 max-xs:w-[90%]">
        <h1 className=" text-4xl max-xs:text-3xl">Forgot password?</h1>
        <h2 className="text-gray-700 max-xs:text-[0.9rem]">
          No worries, we'll send you reset instructions.
        </h2>
      </span>
      {/* a form where you can enter your email address  */}
      <form
        method="post"
        className="flex flex-col gap-3 p-2 max-xs:w-[90%] max-xs:text-[0.95rem] max-vxs:text-[0.8rem]"
        onSubmit={(e) =>
          forgotPassword(e, { email, setResponse, setIsLoading })
        }
      >
        {/* response from the server */}
        <DialogBox message={response.message} type={response.type} />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="rounded border border-gray-700 p-2 "
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* submit button and loading when req is running */}
        <button className="rounded bg-sky-700 p-2 text-white  ">
          {isLoading ? (
            <h1 className=" flex justify-center">
              <TailSpin
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </h1>
          ) : (
            <h1>Submit</h1>
          )}
        </button>
      </form>
      {/* button to go back to login page */}
      <span className="mt-5 p-2  max-xs:mt-3">
        <Link
          to="/authentication"
          className="flex items-center  max-xs:text-[0.9rem] max-vxs:text-[0.75rem]"
        >
          <BiLeftArrowAlt />
          Back to log in
        </Link>
      </span>
    </>
  );
}
