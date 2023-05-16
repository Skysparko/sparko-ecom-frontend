import { dialogBoxPropsType } from "../components/utils/DialogBox";
import { instance } from "./functions";
//function to update the user's personal information such as name and gender and pfp
export const updatePersonalInformation = (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  profileImage: string,
  gender: string,
  x: number,
  y: number,
  width: number,
  height: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  console.log(username, profileImage, gender, x, y, width, height);
  setLoading(true);
  instance
    .put("/user/update-user", {
      username,
      profileImage,
      gender,
      x,
      y,
      width,
      height,
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        location.reload();
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};
//verification of the email address for email update
export const verifyEmailAddress = (
  email: string,
  showOtp: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setNavigateSignal: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setShowOtpResponse: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  instance
    .post("/user/verify-email", { email })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setNavigateSignal(true);
      }
    })
    .catch((error) => {
      setLoading(false);
      if (showOtp) {
        setShowOtpResponse(true);
      } else {
        setShowResponse(true);
      }
      setResponse({ type: "error", message: error.response.data });
      console.log(error);
    });
};

//for updating the email address
export const updateEmailAddress = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  otp: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowOtpResponse: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  instance
    .put("/user/update-email", { email, otp })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setShowOtpResponse(true);
        setResponse({ type: "success", message: response.data });
        setTimeout(() => {
          location.href = "/user";
        }, 1000);
      }
    })
    .catch((error) => {
      setLoading(false);
      setShowOtpResponse(true);
      setResponse({ type: "error", message: error.response.data });
      console.log(error);
    });
};

//for updating the password
export const updatePassword = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currPassword: string,
  newPassword: String,
  confirmPassword: String,

  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>
) => {
  setLoading(true);
  // checking if the new password is equal to the confirm password
  if (newPassword !== confirmPassword) {
    setResponse({
      type: "warning",
      message: "Password and Confirm Password does not match!",
    });
    setLoading(false);
    return;
  }
  instance
    .put("/user/update-password", { newPassword, currPassword })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);

        setResponse({ type: "success", message: response.data });
        setTimeout(() => {
          location.href = "/user";
        }, 1000);
      }
    })
    .catch((error) => {
      setLoading(false);

      setResponse({ type: "error", message: error.response.data });
      console.log(error);
    });
};
