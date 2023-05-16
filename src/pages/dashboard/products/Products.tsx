import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { productType, getAllProducts } from "../../../redux/product.slice";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { instance } from "../../../utils/functions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteProduct } from "../../../utils/product.functions";

// function hover(id: string, i: number) {
//   document.querySelectorAll(`.${id} span section`)[
//     i
//   ].innerHTML = `<MdOutlineModeEditOutline />`;
// }

// function leave(id: string, i: number, item: productType) {
//   document.querySelectorAll(`.${id} span section`)[
//     i
//   ].innerHTML = `<p>${item.description}</p>`;
// }

export default function Products() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  //getting user from redux store
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
        address: string;
      };
    }) => state.user
  );
  // getting addresses from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  const [showActionButtons, setShowActionButtons] = useState(-1);
  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllProducts());
  }, []);

  return (
    <article className="bg-gray-100 p-5">
      <header className="flex justify-between ">
        <h1 className="text-4xl font-semibold">Products</h1>
        <button
          className="flex items-center justify-center gap-2 rounded bg-sky-700 p-1 pl-2 pr-3 text-white shadow-lg"
          onClick={() => navigate("add-product")}
        >
          <AiOutlinePlus /> Create new
        </button>
      </header>
      <main className="mt-5  rounded-lg bg-white">
        <div className="flex justify-between p-5 ">
          <input
            type="search"
            name="product_dashboard_search"
            id="product_dashboard_search"
            className="rounded border border-gray-500 p-2 shadow-md"
            placeholder="Search products here"
          />

          <span className="flex gap-5 text-center max-sm:hidden">
            <select
              name="status"
              id="status"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md "
            >
              <option value="All">All</option>
              <option value="Active">Public</option>
              <option value="Archived">Private</option>
            </select>

            {/* <label htmlFor="show">Show</label> */}
            <select
              name="show"
              id="show"
              className="rounded  border border-gray-400 bg-white p-2 text-center shadow-md "
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            {/* <label htmlFor="sort"> Date</label> */}
            <select
              name="sort"
              id="sort"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="today">today</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </span>
          <span className="hidden self-center text-2xl max-sm:flex">
            <BsThreeDotsVertical />
          </span>
        </div>
        <table className="w-full text-center max-sm:hidden">
          <thead>
            <tr>
              <th>S.No.</th>
              <th className="w-[35rem]">Product</th>

              <th>Price</th>
              <th>Offer</th>

              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i} className="hover:bg-slate-200 ">
                <td>{i + 1}</td>
                <td
                  className="product_col flex gap-5 p-2"
                  onMouseEnter={() => setShowActionButtons(i)}
                  onMouseLeave={() => setShowActionButtons(-1)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="  h-20 w-20 rounded object-contain shadow"
                  />
                  <span className="flex flex-col gap-2 text-left">
                    <h1 className="font-medium line-clamp-1">{item.title}</h1>
                    <section className="text-xs text-gray-700 line-clamp-2">
                      {showActionButtons === i ? (
                        <span className="flex gap-3 text-xl ">
                          <MdOutlineModeEditOutline
                            className="cursor-pointer hover:text-blue-700"
                            onClick={(e) =>
                              navigate(`edit-product?product=${item._id}`)
                            }
                          />
                          <MdDeleteOutline
                            className="cursor-pointer hover:text-red-700"
                            onClick={() => deleteProduct(item._id)}
                          />
                        </span>
                      ) : (
                        <p>{item.description}</p>
                      )}
                    </section>
                  </span>
                </td>
                {/* <td className="p-2">{item.title}</td> */}
                <td className="p-2">{item.price.toString()}</td>
                <td className="p-2">
                  {item.offer > 0 ? item.offer : "No offer"}
                </td>

                <td className="p-2">{item.stock}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="m-5 hidden grid-cols-[repeat(2,minmax(200px,200px))] gap-5 max-sm:grid">
          {products.map((item, i) => (
            <section
              key={i}
              className="flex flex-col gap-3 border border-black p-5 text-center"
            >
              <img
                src={item.images[0]}
                className="m-auto h-40 w-40 rounded border border-gray-400 object-contain shadow"
              />
              <span className="flex flex-col gap-1">
                <h1 className="font-medium line-clamp-1">{item.title}</h1>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </span>
            </section>
          ))}
        </div>
      </main>
    </article>
  );
}
