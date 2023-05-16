import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { updatePassword } from "../../../utils/user.functions";
import DialogBox, {
  dialogBoxPropsType,
} from "../../../components/utils/DialogBox";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { passwordViewToggler } from "../../../utils/functions";

export default function EditPassword() {
  //loading state
  const [loading, setLoading] = useState(false);
  //form state
  const [newPassword, setNewPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //response state
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message:
      "Password must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 number",
  });

  return (
    // edit password section
    <div className="max-xs:xs  flex  flex-col justify-center p-24 max-md:px-10 max-sm:py-10 max-sm:text-sm max-vs:px-5 max-xs:px-2 ">
      {/* heading and info  */}
      <span className="m-auto my-5 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Change Password</h1>
        <h3>
          Use the form below to change the password for your Sstore account
        </h3>
        <DialogBox type={response.type} message={response.message} />
      </span>
      {/* form containing current password, new password and confirm password fields  */}
      <form
        className="m-auto flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword(
            setLoading,
            currPassword,
            newPassword,
            confirmPassword,
            setResponse
          );
        }}
      >
        {/* current password section containing label and input field  */}
        <span className="flex flex-col">
          <label htmlFor="edit_curr_password">Current password:</label>
          <input
            type="password"
            name="currentPassword"
            id="edit_curr_password"
            className=" rounded border border-gray-500 p-2 shadow-inner"
            required
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </span>
        {/* new password section containing label and input field  */}

        <span className="flex flex-col">
          <label htmlFor="edit_new_password">New password:</label>

          <input
            type="password"
            name="currentPassword"
            id="edit_new_password"
            className=" rounded border border-gray-500 p-2 shadow-inner"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </span>
        {/* confirm new password section containing label and input field  */}

        <span className="flex flex-col">
          <label htmlFor="edit_confirm_new_password">
            Confirm new password:
          </label>
          <input
            type="password"
            name="currentPassword"
            id="edit_confirm_new_password"
            className=" rounded border border-gray-500 p-2 shadow-inner"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </span>
        {/* show password section containing label and checkbox to show or hide password  */}

        <span className="flex gap-2">
          <input
            type="checkbox"
            name="showPassword"
            id="show_password"
            onChange={(e) => {
              const curr_Password: HTMLInputElement = document.querySelector(
                "#edit_curr_password"
              )!;
              const new_Password: HTMLInputElement =
                document.querySelector("#edit_new_password")!;
              const confirm_Password: HTMLInputElement = document.querySelector(
                "#edit_confirm_new_password"
              )!;
              if (e.target.checked) {
                curr_Password.type = "text";
                new_Password.type = "text";
                confirm_Password.type = "text";
              } else {
                curr_Password.type = "password";
                new_Password.type = "password";
                confirm_Password.type = "password";
              }
            }}
          />
          <label htmlFor="show_password" className="text-sm">
            Show password
          </label>
        </span>
        {/* submit button and loading while api is fetching data  */}
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
            <>Submit</>
          )}
        </button>
      </form>
    </div>
  );
}
