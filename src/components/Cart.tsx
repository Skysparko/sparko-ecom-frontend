import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { getAllCartItems } from "../redux/cart.slice";

export default function Cart() {
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
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    user.isAuthenticated && dispatch(getAllCartItems());
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
