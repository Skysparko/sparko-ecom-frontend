import React, { useEffect, useRef } from "react";
import warning from "../../assets/images/dialogBox/warning.png";
import success from "../../assets/images/dialogBox/success.png";
import error from "../../assets/images/dialogBox/error.png";
import info from "../../assets/images/dialogBox/info.png";
export interface dialogBoxPropsType {
  type: "warning" | "success" | "info" | "error";
  message: string;
}

//dialog box component definition
export default function (props: dialogBoxPropsType) {
  switch (props.type) {
    //warning
    case "warning":
      return (
        <span className="flex items-center gap-1 rounded  bg-yellow-100 p-2 text-[0.8rem] max-xs:text-xs max-vxs:text-[0.7rem]">
          <img src={warning} alt="warning" className="h-5 w-5" />
          <h1>{props.message}</h1>
        </span>
      );
    //success
    case "success":
      return (
        <span className="flex items-center gap-1 rounded  bg-green-100 p-2 text-[0.8rem] max-xs:text-xs max-vxs:text-[0.7rem]">
          <img src={success} alt="success" className="h-5 w-5" />
          <h1>{props.message}</h1>
        </span>
      );
    //error
    case "error":
      return (
        <span className="flex items-center gap-1 rounded  bg-red-100 p-2 text-[0.8rem] max-xs:text-xs max-vxs:text-[0.7rem]">
          <img src={error} alt="error" className="h-5 w-5" />
          <h1>{props.message}</h1>
        </span>
      );
    //info
    case "info":
      return (
        <span className="flex items-center gap-1 rounded  bg-blue-100 p-2 text-[0.8rem] max-xs:text-xs max-vxs:text-[0.7rem]">
          <img src={info} alt="info" className="h-5 w-5" />
          <h1>{props.message}</h1>
        </span>
      );
    default:
      return (
        <span>
          This value is not allowed in this context of the application
        </span>
      );
  }
}
