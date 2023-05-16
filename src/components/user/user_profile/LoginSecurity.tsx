import React from "react";
import { Outlet } from "react-router-dom";

export default function LoginSecurity() {
  return (
    // it can have two component first is editEmail and second is editPassword
    <div>
      <Outlet />
    </div>
  );
}
