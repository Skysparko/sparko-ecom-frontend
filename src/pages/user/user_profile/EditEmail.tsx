import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  updateEmailAddress,
  verifyEmailAddress,
} from "../../../utils/user.functions";
import OTPInput, { ResendOTP } from "otp-input-react";
import { TailSpin } from "react-loader-spinner";
import DialogBox, {
  dialogBoxPropsType,
} from "../../../components/utils/DialogBox";
import { useSelector } from "react-redux";

//custom timer for otp
const renderTime = (time: number) => {
  return (
    <span id="resend_timer">
      <DialogBox type="info" message={`${time} seconds remaining`} />
    </span>
  );
};

//custom resend button for otp
const renderButton = (buttonProps: Array<string>) => {
  return (
    <button
      id="resend_button"
      {...buttonProps}
      className="mb-3 w-28 font-medium text-blue-600 opacity-60"
    >
      Resend code
    </button>
  );
};

export default function EditEmail() {
  //getting user info from redux store
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
  //loading state
  const [loading, setLoading] = useState(false);
  //form state
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  //conditional state
  const [showOtp, setShowOtp] = useState(false);
  const [showOtpResponse, setShowOtpResponse] = useState(false);
  //response state
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "",
  });
  const [showResponse, setShowResponse] = useState(false);

  return (
    <div className="max-xs:xs  flex  flex-col justify-center p-24 max-md:px-10 max-sm:py-10 max-sm:text-sm max-vs:px-5 max-xs:px-2 ">
      {/* This form is shown by default containing email and submit button */}
      {!showOtp ? (
        <form
          id="edit-email-form"
          className="m-auto flex w-[30rem] flex-col gap-5  max-sm:w-[95%]"
          onSubmit={(e) => {
            e.preventDefault();
            verifyEmailAddress(
              email,
              showOtp,
              setLoading,
              setShowOtp,
              setResponse,
              setShowResponse,
              setShowOtpResponse
            );
          }}
        >
          {/* title and info  */}
          <h1 className="text-center text-3xl font-semibold max-sm:text-2xl max-xs:text-xl">
            Change your email address
          </h1>
          <span>
            <p>Current email address:</p>
            <p>{user.email}</p>
          </span>
          <p>
            Enter the new email address you would like to associate with your
            account below. We will send a One Time Password (OTP) to that
            address.
          </p>
          {/* response */}
          {showResponse && (
            <DialogBox type={response.type} message={response.message} />
          )}
          {/* email label and input field  */}
          <span className="flex flex-col">
            <label htmlFor="new_email_address">New email address:</label>
            <input
              type="email"
              id="new_email_address"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-400 p-2 shadow-inner"
            />
          </span>
          {/* continue and loading while api call  */}
          <button className="flex justify-center rounded-md bg-sky-700 py-2 px-5 text-white">
            {loading ? (
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
            ) : (
              <>Continue</>
            )}
          </button>
        </form>
      ) : (
        // Otp section is shown when the user enters email and continue
        <div className=" m-auto flex flex-col justify-center">
          {/* title and info  */}
          <span className="flex flex-col gap-2 ">
            <h1 className="text-2xl font-semibold max-md:text-xl">
              Enter verification code
            </h1>
            <h3 className="max-md:text-sm">
              For your security, we have sent the code to your email {email[0]}
              *******@
              {email.split("@")[1]}.
            </h3>
          </span>
          {/* otp input fields  */}
          <span className="my-5 flex justify-center">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              style={{}}
              inputClassName="!flex !h-12  !rounded border-2 font-semibold border-gray-800 text-xl  !m-1 "
              className="m-auto "
            />
          </span>
          {/* resend button with the timer  */}
          <span className="max flex flex-col gap-5 max-md:text-sm">
            <ResendOTP
              onResendClick={() => {
                verifyEmailAddress(
                  email,
                  showOtp,
                  setLoading,
                  setShowOtp,
                  setResponse,
                  setShowResponse,
                  setShowOtpResponse
                );
              }}
              onTimerComplete={() => {
                const resendButton = document.querySelector("#resend_button");
                const resendTimer = document.querySelector("#resend_timer");
                resendButton?.classList.remove("opacity-60");
                resendTimer?.classList.add("hidden");
              }}
              renderTime={renderTime}
              renderButton={renderButton}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
            />
            {/* response */}
            {showOtpResponse && (
              <DialogBox type={response.type} message={response.message} />
            )}
            {/* Submit and loading while api call  */}
            <button
              className="m-auto flex justify-center rounded-md bg-sky-700 py-2 px-5 text-white"
              onClick={(e) => {
                e.preventDefault();

                updateEmailAddress(
                  setLoading,
                  email,
                  OTP,
                  setResponse,
                  setShowOtpResponse
                );
              }}
            >
              {loading ? (
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
              ) : (
                <>Submit</>
              )}
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
