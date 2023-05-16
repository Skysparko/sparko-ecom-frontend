import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import {
  MdHelpOutline,
  MdOutlineKeyboardArrowRight,
  MdOutlineLocationOn,
  MdOutlinePayments,
  MdSearch,
} from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import SideBar, { openSidebar } from "./SideBar";
import { useNavigate, Link } from "react-router-dom";

import { BiEdit, BiLogOut } from "react-icons/bi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { logout } from "../utils/auth.functions";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { categoryType, getAllCategories } from "../redux/category.slice";
import { AppDispatch } from "../redux/store";
import { cartType, getAllCartItems } from "../redux/cart.slice";
import { fetchAllCartItems } from "../utils/cart.functions";
import { getCartItemCount } from "../utils/functions";
import { productType } from "../redux/product.slice";
import {
  getSearchResults,
  getSearchSuggestions,
} from "../utils/search.functions";

export default function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

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
  //logic for responsive design
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );

  const [profileMenu, setProfileMenu] = useState(false);

  // getting categories from redux store
  const categoriesState = useSelector(
    (state: { category: { value: Array<categoryType>; loading: boolean } }) =>
      state.category
  );
  const { value: categories } = categoriesState ?? {};
  const [showEmpty, setShowEmpty] = useState(true);

  useEffect(() => {
    // Elements
    const header: HTMLElement | null = document.getElementById("header");

    //logic for responsive design
    if (width < 850) {
      header?.classList.add("grid-cols-[1fr,1fr]");
      header?.classList.remove("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.remove("border", "border-black");
    } else {
      header?.classList.remove("grid-cols-[1fr,1fr]");
      header?.classList.add("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.add("border", "border-black");
    }
    document.addEventListener("click", (e) => {
      const userImage: HTMLElement | null =
        document.getElementById("user_image");
      if (e.target != userImage) {
        setProfileMenu(false);
      }
    });
    user.isAuthenticated && dispatch(getAllCartItems());
  }, [dispatch]);
  // getting cartItems from redux store
  const cartState = useSelector(
    (state: { cart: { value: Array<cartType>; loading: boolean } }) =>
      state.cart
  );
  const { value: cartItems } = cartState ?? {};

  const cartItemCount = getCartItemCount(cartItems);
  const header = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLUListElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  useLayoutEffect(() => {
    const space: HTMLDivElement = document.querySelector("#extra")!;
    space.style.marginBottom = `${header.current?.offsetHeight}px`;
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  };
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Array<string>>([""]);

  return (
    <>
      <div className="" id="extra"></div>
      <div className={`fixed top-0  z-10  w-full`} ref={header}>
        {/* Side bar */}
        {user.isAuthenticated && (
          <aside>
            <SideBar />
          </aside>
        )}
        {/*  Three grid containing name search and function */}
        <article
          id="header"
          className="grid select-none grid-cols-[1fr,2.5fr,1fr] border border-black  bg-sky-900 py-2  text-2xl bg-blend-hue  max-lg:text-xl max-md:text-lg"
        >
          {/* hamburger column and the name of the company */}
          <div className=" flex  items-center  gap-5  pl-5 text-3xl text-white max-lg:text-2xl max-md:pl-2 max-sm:gap-2 ">
            {user.isAuthenticated && (
              <button className="cursor-pointer " onClick={openSidebar}>
                <VscThreeBars />
              </button>
            )}

            <h1 className="cursor-pointer" onClick={() => navigate("/")}>
              SStore
            </h1>
          </div>

          {
            /* Ui for search (devices having screens more then 850px)*/
            width > 850 && (
              <div id="search_desktop">
                <form
                  id="search_desktop_form"
                  method="get"
                  className=" flex justify-center rounded-md border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 "
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(
                      "/search?category=" + category + "&term=" + searchQuery
                    );
                  }}
                >
                  {/* categories */}
                  <select
                    name="categories"
                    id="categories_desktop"
                    className="cursor-pointer rounded-l-md border border-black bg-white text-center outline-none"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All</option>
                    {categories.map((category, i) => (
                      <option key={i} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {/* search bar */}
                  <span className="relative w-full">
                    <input
                      type="search"
                      name="search"
                      id="search_desktop"
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        getSearchSuggestions(category, e.target.value, setData);
                      }}
                      onClick={() => {
                        setShowSuggestions(true);
                      }}
                      className="group w-full border border-black  p-2 outline-none"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search"
                      autoComplete="Off"
                    />
                    {searchQuery !== "" && showSuggestions && (
                      <ul
                        ref={ref}
                        className="absolute flex w-full flex-col rounded-b bg-white px-5 shadow "
                        id="searchSuggestions_desktop"
                      >
                        {data!.map(
                          (item, key) =>
                            key < 5 && (
                              <li
                                key={key}
                                className="cursor-pointer border-b py-3"
                                onClick={(e) =>
                                  navigate(
                                    "/search?category=" +
                                      category +
                                      "&term=" +
                                      e.currentTarget.textContent
                                  )
                                }
                              >
                                {item}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </span>
                  {/* search button */}
                  <button
                    type="submit"
                    id="submit_search_desktop"
                    className="rounded-r-md border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
                  >
                    <MdSearch />
                  </button>
                </form>
              </div>
            )
          }

          {/* section containing login and cart  */}
          <div className=" flex  justify-end gap-10  pr-10 text-xl text-white max-lg:pr-5 max-sm:gap-5 max-sm:text-[1.15rem] max-xs:text-[1rem]">
            {user.isAuthenticated ? (
              //User section
              <section id="user_icon" className="pt-1 max-sm:pt-[0.2rem]">
                <img
                  id="user_image"
                  src={user.pfp}
                  alt={user.name}
                  className="w-10 cursor-pointer  rounded-full max-lg:w-8 max-sm:w-7"
                  onClick={() => setProfileMenu(!profileMenu)}
                />
                {profileMenu && (
                  <div
                    id="user_profile_menu"
                    className="absolute right-14 z-10 mt-3 w-60 rounded-lg bg-white p-2 text-base text-black shadow-lg max-lg:right-8 max-lg:w-56 max-lg:text-[0.9rem] max-sm:hidden"
                  >
                    <span className="absolute right-14 -top-2 float-right h-5 w-5 rotate-45  bg-white"></span>
                    <ul>
                      {user.isAuthenticated && user.role === "owner" && (
                        <li className="flex items-center gap-2 border-b   p-1.5 ">
                          <RxDashboard />
                          <Link to="/dashboard">My Dashboard</Link>
                        </li>
                      )}
                      <li className="flex items-center gap-2  p-1.5 ">
                        <FaRegUserCircle />
                        <Link to="/account">My Account</Link>
                      </li>
                      <li className="flex items-center gap-2 border-y p-1.5 ">
                        <BiEdit />
                        <Link to="/user">Edit Profile</Link>
                      </li>

                      <li className="flex items-center gap-2  p-1.5 ">
                        <MdOutlineShoppingBag />
                        <Link to="/user/orders">Orders</Link>
                      </li>
                      <li className="border- flex items-center gap-2 border-y p-1.5 ">
                        <MdOutlinePayments />
                        <Link to="/user/payment">Payment Options</Link>
                      </li>
                      <li className="flex items-center gap-2  p-1.5 ">
                        <MdOutlineLocationOn />
                        <Link to="/user/addresses">Manage Addresses</Link>
                      </li>
                      <li className="flex items-center gap-2 border-y p-1.5 ">
                        <MdHelpOutline />

                        <Link to="/user/help">Help</Link>
                      </li>
                      <li
                        className="flex cursor-pointer items-center  gap-2 p-1.5 "
                        onClick={logout}
                      >
                        <BiLogOut />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </section>
            ) : (
              /* Login section */
              <span
                className="flex cursor-pointer items-center"
                onClick={() => navigate("/authentication")}
              >
                {width > 250 && (
                  <span className="flex cursor-pointer items-center">
                    <h3>Login</h3>
                    <MdOutlineKeyboardArrowRight />
                  </span>
                )}

                <FaUserAlt />
              </span>
            )}
            {/* cart section */}
            <button className="relative  text-2xl  ">
              <Link to="/cart">
                <RiShoppingCartFill />
                {user.isAuthenticated && (
                  <span className="absolute top-0 right-0 -mr-2 rounded-full border border-green-600 bg-green-500 px-1.5 py-0.5 text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </button>
          </div>
        </article>

        {/* search section for devices having screens less than 850px  */}
        {width < 850 && (
          <div id="search_mobile">
            <form
              id="search_mobile_form"
              method="get"
              className=" relative flex justify-center border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 "
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  "/search?category=" + category + "&term=" + searchQuery
                );
              }}
            >
              {/* Categories */}
              <select
                name="categories"
                id="categories_mobile"
                className="border border-black bg-white text-center outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                {categories.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              {/* <span className="relative w-full"> */}
              <input
                type="search"
                name="search"
                id="search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  getSearchSuggestions(category, e.target.value, setData);
                }}
                onClick={() => {
                  setShowSuggestions(true);
                }}
                className="w-full border border-black px-2  outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search"
                autoComplete="Off"
              />
              {searchQuery !== "" && showSuggestions && (
                <ul
                  ref={ref}
                  className="absolute top-9 flex w-full flex-col rounded-b bg-white px-3 shadow "
                  id="searchSuggestions_desktop"
                >
                  {data!.map(
                    (item, key) =>
                      key < 3 && (
                        <li
                          key={key}
                          className="cursor-pointer border-b py-3"
                          onClick={(e) =>
                            navigate(
                              "/search?category=" +
                                category +
                                "&term=" +
                                e.currentTarget.textContent
                            )
                          }
                        >
                          {item}
                        </li>
                      )
                  )}
                </ul>
              )}
              {/* </span> */}

              {/* Search button */}
              <button
                type="submit"
                id="submit_search_mobile"
                className="border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
              >
                <MdSearch />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
