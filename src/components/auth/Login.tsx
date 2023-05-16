import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { passwordViewToggler } from "../../utils/functions";
import DialogBox, { dialogBoxPropsType } from "../utils/DialogBox";
import { loggingIn } from "../../utils/auth.functions";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "Please enter your email and password ! ",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    // This have a form containing email and password input bar with a button for show password and checkbox for remember me and forgot password button
    <div className="my-7 flex  flex-col items-center justify-center">
      <form
        method="post"
        className=" flex w-72 flex-col gap-5  max-vs:w-[95%]"
        onSubmit={(e) =>
          loggingIn(e, {
            email,
            password,
            setResponse,
            rememberMe,
            setIsLoading,
          })
        }
      >
        <DialogBox type={response.type} message={response.message} />
        {/* Email Bar */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" rounded border-2 border-gray-600 p-2 px-2 shadow-inner outline-blue-600
          max-vs:text-sm max-vxs:text-xs"
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
          required
        />
        {/* Password Bar */}
        <span className="flex">
          {/* Password Input Bar */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="login_password"
            className="w-72 rounded border-2 border-gray-600 p-2 px-2 pr-10 shadow-inner
          outline-blue-600 max-vs:w-[100%] max-vs:text-sm max-vxs:text-xs"
            required
            minLength={8}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Password View Toggle Button */}
          <span
            className="-ml-8 mt-3 cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
            id="password_show_toggler"
          >
            {/* Toggle password show or hide */}
            {showPassword ? (
              <BsEye
                onClick={() =>
                  passwordViewToggler(
                    showPassword,
                    setShowPassword,
                    "#login_password"
                  )
                }
              />
            ) : (
              <BsEyeSlash
                onClick={() =>
                  passwordViewToggler(
                    showPassword,
                    setShowPassword,
                    "#login_password"
                  )
                }
              />
            )}
          </span>
        </span>
        {/* Remember me and Forgot your password  */}
        <span
          className="flex items-center justify-between 
         max-vs:text-xs"
        >
          {/* Remember Section */}
          <span className="flex items-center gap-1">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="text-sm"
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Remember me</label>
          </span>
          {/* Forgot Password Section */}
          <h3
            className=" cursor-pointer justify-self-end text-right text-sm text-blue-700 max-vs:text-xs"
            onClick={() => navigate("forgot-password")}
          >
            forgot password?
          </h3>
        </span>
        {/* Login Button (Form Submit) */}
        <button
          type="submit"
          className=" rounded border-2 border-black bg-blue-500 py-1 text-white"
        >
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
            <h1>login</h1>
          )}
        </button>
      </form>
    </div>
  );
}
