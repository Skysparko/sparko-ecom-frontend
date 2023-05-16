import React, { useEffect, useRef, useState } from "react";
import { productType } from "../redux/product.slice";
import { instance } from "../utils/functions";
import {
  getSearchResultUsingPriceRange,
  getSearchResults,
  handleDiscountChange,
  handleSort,
  handleSubCategoryClick,
} from "../utils/search.functions";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { categoryType } from "../redux/category.slice";
import { subcategoryType } from "../redux/subCategory.slice";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function SearchResult() {
  const [data, setData] = useState<Array<productType>>();
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageList, setPageList] = useState<Array<number>>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showClose, setShowClose] = useState(false);

  const navigate = useNavigate();
  const change = useParams();

  // getting categories from redux store
  const categoriesState = useSelector(
    (state: { category: { value: Array<categoryType>; loading: boolean } }) =>
      state.category
  );
  const { value: categories } = categoriesState ?? {};
  // getting categories from redux store
  const subCategoriesState = useSelector(
    (state: {
      subCategory: { value: Array<subcategoryType>; loading: boolean };
    }) => state.subCategory
  );
  const { value: subCategories } = subCategoriesState ?? {};

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category"
    )!;
    setCategory(category);
    const searchQuery = new URLSearchParams(window.location.search).get(
      "term"
    )!;
    setSearchQuery(searchQuery);

    getSearchResults(
      category,
      searchQuery,
      "",
      setData,
      limit,
      page,
      setTotalPage,
      setPageList
    );
  }, [change]);

  return (
    <article
      className=" grid grid-cols-[250px,1fr]  max-xl:grid-cols-1 max-xl:grid-rows-1"
      id="main_search_container"
    >
      <section
        className="flex flex-col gap-5 overflow-y-auto border border-gray-300 p-5 shadow max-xl:hidden max-xl:flex-row max-xl:flex-wrap max-xl:justify-between"
        id="filter_section"
      >
        <span>
          <h1 className="pb-2  font-semibold ">Categories</h1>
          <div className="flex flex-col gap-3 px-5">
            {categories.map(
              (cat, key) =>
                cat.name !== "Other" && (
                  <details className="cursor-pointer text-sm" key={key}>
                    <summary
                      onClick={(e) =>
                        (e.target as HTMLDetailsElement).classList.toggle(
                          "font-semibold"
                        )
                      }
                    >
                      {cat.name}
                    </summary>
                    <ul className="flex flex-col gap-2">
                      {subCategories.map(
                        (subCat, key) =>
                          subCat.categoryID === cat._id && (
                            <li
                              key={key}
                              className="px-5 hover:text-blue-600"
                              onClick={(e) =>
                                handleSubCategoryClick(
                                  e,
                                  setSelectedSubCategory,
                                  setData,
                                  subCategories,

                                  category,
                                  searchQuery,
                                  limit,
                                  page,
                                  setTotalPage,
                                  setPageList
                                )
                              }
                            >
                              {subCat.name}
                            </li>
                          )
                      )}
                    </ul>
                  </details>
                )
            )}
            {categories.map(
              (cat, key) =>
                cat.name === "Other" && (
                  <details className="cursor-pointer" key={key}>
                    <summary
                      onClick={(e) =>
                        (e.target as HTMLDetailsElement).classList.toggle(
                          "font-semibold"
                        )
                      }
                    >
                      {cat.name}
                    </summary>

                    <ul className="flex flex-col gap-2">
                      {subCategories.map(
                        (subCat, key) =>
                          subCat.categoryID === cat._id && (
                            <li key={key} className="px-5 hover:text-blue-600">
                              {subCat.name}
                            </li>
                          )
                      )}
                    </ul>
                  </details>
                )
            )}
          </div>
        </span>
        <span>
          <h1 className="pb-2  font-semibold ">Price</h1>

          <form
            className="flex items-center gap-2 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              getSearchResultUsingPriceRange(
                selectedSubCategory,
                setData,
                subCategories,
                category,
                searchQuery,
                minPrice,
                maxPrice,
                limit,
                page,
                setTotalPage,
                setPageList
              );
            }}
          >
            ₹
            <input
              type="number"
              name=""
              id=""
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="w-16 rounded border border-gray-500 p-2 shadow-inner outline-sky-600"
              placeholder="Min"
            />
            <input
              type="number"
              name=""
              id=""
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-16 rounded border border-gray-500 p-2 shadow-inner outline-sky-600"
              placeholder="Max"
            />
            <button
              type="submit"
              className="rounded-full border border-gray-500 p-2 shadow"
            >
              Go
            </button>
          </form>
        </span>
        <span className="">
          <h1 className="pb-2  font-semibold ">Customer Review</h1>
          <span className=" flex flex-col px-5 text-lg">
            <div className="flex cursor-pointer items-center gap-2">
              <Rating
                initialRating={4}
                emptySymbol={<BsStar color="orange" />}
                fullSymbol={<BsStarFill color="orange" />}
                readonly
              />
              <span className="text-sm">& up</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <Rating
                initialRating={3}
                emptySymbol={<BsStar color="orange" />}
                fullSymbol={<BsStarFill color="orange" />}
                readonly
              />
              <span className="text-sm">& up</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <Rating
                initialRating={2}
                emptySymbol={<BsStar color="orange" />}
                fullSymbol={<BsStarFill color="orange" />}
                readonly
              />
              <span className="text-sm">& up</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <Rating
                initialRating={1}
                emptySymbol={<BsStar color="orange" />}
                fullSymbol={<BsStarFill color="orange" />}
                readonly
              />
              <span className="text-sm">& up</span>
            </div>
          </span>
        </span>
        <span className="">
          <h1 className="pb-2  font-semibold ">Discount</h1>
          <span className="px-5 text-sm">
            <select
              className="rounded border border-gray-500 bg-white p-2 px-5"
              onChange={(e) =>
                handleDiscountChange(
                  selectedSubCategory,
                  setData,
                  subCategories,
                  category,
                  searchQuery,
                  parseInt(e.target.value),
                  limit,
                  page,
                  setTotalPage,
                  setPageList
                )
              }
            >
              <option value="0">--No Offer--</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
              <option value="35">35%</option>
              <option value="40">40%</option>
              <option value="45">45%</option>
              <option value="50">50%</option>
              <option value="55">55%</option>
              <option value="60">60%</option>
              <option value="65">65%</option>
              <option value="70">70%</option>
              <option value="75">75%</option>
              <option value="80">80%</option>
              <option value="85">85%</option>
              <option value="90">90%</option>
            </select>
          </span>
        </span>
        <span>
          <h1 className="pb-2  font-semibold ">Availability</h1>
          <span className="flex gap-2 text-sm">
            <input type="checkbox" name="" id="include_out_of_stock" />
            <label htmlFor="include_out_of_stock">Include out of stock</label>
          </span>
        </span>
      </section>
      <section className="bg-gray-100  ">
        <div className="flex items-center justify-between gap-3 border-b bg-white p-2 px-5 shadow max-vxs:px-2">
          <span className="flex items-center gap-1 max-xl:hidden">
            <h3>results for</h3>
            <h1 className="font-semibold text-orange-700">"{searchQuery}"</h1>
          </span>
          <span className="flex items-center gap-3 max-xs:flex-col max-xs:justify-center">
            <h3 className="max-xs:hidden">Sort by:</h3>
            <select
              name=""
              id=""
              className="rounded border-2 p-2"
              onChange={(e) =>
                handleSort(
                  e,
                  setSort,
                  data,
                  category,
                  searchQuery,
                  setData,
                  limit,
                  page,
                  setTotalPage,
                  setPageList
                )
              }
            >
              <option value="">Featured</option>
              <option value="low_to_high">Price: Low to High</option>
              <option value="high_to_low">Price: High to Low</option>
              <option value="review">Avg. Review</option>
            </select>
          </span>
          {showFilters && (
            <button
              onClick={(e) => {
                let filterSection: HTMLDivElement =
                  document.querySelector("#filter_section")!;
                let container: HTMLDivElement = document.querySelector(
                  "#main_search_container"
                )!;
                container.classList.add("grid-rows-[250px,1fr]");
                container.classList.remove("max-xl:grid-rows-1");
                filterSection.classList.remove("max-xl:hidden");
                setShowFilters(false);
                setShowClose(true);
              }}
              className="hidden  drop-shadow hover:text-blue-700 max-xl:block"
            >
              Filters
            </button>
          )}
          {showClose && (
            <button
              onClick={(e) => {
                let filterSection: HTMLDivElement =
                  document.querySelector("#filter_section")!;
                let container: HTMLDivElement = document.querySelector(
                  "#main_search_container"
                )!;
                container.classList.remove("grid-rows-[250px,1fr]");
                container.classList.add("max-xl:grid-rows-1");
                filterSection.classList.add("max-xl:hidden");
                setShowFilters(true);
                setShowClose(false);
              }}
              className="hidden  drop-shadow hover:text-blue-700 max-xl:block"
            >
              Close
            </button>
          )}
        </div>
        <div className="p-5 max-xs:px-0 ">
          <h1 className="pb-5 text-3xl font-semibold drop-shadow max-xs:px-2">
            Results
          </h1>
          <div className="grid grid-cols-4 gap-5 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {data?.map((product, key) => (
              <div
                key={key}
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded border border-gray-300 bg-white p-5 shadow"
                onClick={() => navigate(`/product?p=${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-52
                w-52 object-contain"
                />
                <h2 className=" line-clamp-2"> {product.title}</h2>
                <div className="flex w-full flex-col  gap-1  text-left ">
                  {product.offer! > 0 ? (
                    <span className="">
                      <span className="flex gap-2  text-lg">
                        <h4 className="text-red-700">-{product.offer}%</h4>
                        <h4 className="">
                          ₹
                          {Math.round(
                            product.price -
                              (product.offer / 100) * product.price
                          )}
                        </h4>
                      </span>
                      <span className="flex gap-2 text-sm text-gray-600">
                        <h4>M.R.P.:</h4>
                        <h4 className=" line-through">₹{product.price}</h4>
                      </span>
                    </span>
                  ) : (
                    <h4 className="">₹ {product.price}</h4>
                  )}
                  <p className="text-sm text-gray-700 ">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPage > 1 && (
          <div className=" p-5">
            <span className="flex justify-center gap-5 rounded border border-gray-400 bg-white p-5 shadow">
              {page > 1 && (
                <button
                  onClick={() => {
                    setPage(page - 1);
                    getSearchResults(
                      category,
                      searchQuery,
                      selectedSubCategory,
                      setData,
                      limit,
                      page - 1,
                      setTotalPage,
                      setPageList
                    );
                  }}
                  className="rounded border border-gray-500 p-2 px-4 shadow"
                >
                  prev
                </button>
              )}
              <span>
                {pageList.map((item, key) => (
                  <button
                    key={key}
                    className="border border-gray-500 p-2 px-4 shadow"
                    onClick={() => {
                      setPage(key + 1);
                      getSearchResults(
                        category,
                        searchQuery,
                        selectedSubCategory,
                        setData,
                        limit,
                        key + 1,
                        setTotalPage,
                        setPageList
                      );
                    }}
                  >
                    {item}
                  </button>
                ))}
              </span>

              {page !== totalPage && (
                <button
                  onClick={() => {
                    setPage(page + 1);
                    getSearchResults(
                      category,
                      searchQuery,
                      selectedSubCategory,
                      setData,
                      limit,
                      page + 1,
                      setTotalPage,
                      setPageList
                    );
                  }}
                  className="rounded border border-gray-500 p-2 px-4 shadow"
                >
                  Next
                </button>
              )}
            </span>
          </div>
        )}
      </section>
    </article>
  );
}
