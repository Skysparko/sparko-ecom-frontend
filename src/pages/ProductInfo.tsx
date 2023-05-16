import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, productType } from "../redux/product.slice";
import { useEffect } from "react";
import { addItemToCart } from "../utils/cart.functions";
import {
  MagnifierContainer,
  SideBySideMagnifier,
} from "react-image-magnifiers";
import { FcApproval, FcMoneyTransfer, FcPaid, FcShipped } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { instance } from "../utils/functions";
import Rating from "react-rating";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";
import { BsStar, BsStarFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BallTriangle } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper";
//this function change style of the selected div
const highlightSelected = (i: number) => {
  const image = document.querySelectorAll("#images img");

  // remove the class from the others
  image.forEach((d) => {
    d.classList.remove("border-black");
    d.classList.remove("border-2");
    d.classList.add("border");
  });

  //adding styling classes to the selected div
  const page = image[i];
  page?.classList.remove("border");
  page?.classList.add("border-2", "border-black");
  console.log(i);
};
export default function ProductInfo() {
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  // const [product, setProduct] = useState<productType>();

  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [tags, setTags] = useState<Array<string>>([]);
  const [images, setImages] = React.useState<Array<string>>([]);
  // const [userImages, setUserImages] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(-1);
  const [offer, setOffer] = React.useState(-1);
  const [stock, setStock] = React.useState(-1);
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  // const [productId, setProductId] = React.useState("");
  const [status, setStatus] = React.useState("Public");
  const [subCategoryList, setSubCategoryList] = useState<
    Array<{
      _id: string;
      name: string;
      description: string;
      categoryID: string;
    }>
  >([]);
  const [mainImage, setMainImage] = useState("");

  const [productChange, setProductChange] = useState(false);
  const [editor, setEditor] = useState(() => EditorState.createEmpty());

  const [returnPolicy, setReturnPolicy] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const [returnDuration, setReturnDuration] = useState(0);
  const [warranty, setWarranty] = useState(false);

  const [warrantyDuration, setWarrantyDuration] = useState(0);
  const [loadingState, setLoadingState] = useState(true);

  const [sizeList, setSizeList] = useState([""]);

  const [size, setSize] = useState("");

  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  useEffect(() => {
    const productId = new URLSearchParams( `?${window.location.href.split("?")[1]}`).get("p")!;
    if (productId) {
      setProductId(productId);

      instance
        .get(`product/${productId}`)
        .then((res) => {
          console.log(res.data);
          setReturnPolicy(res.data.returnPolicy);
          setFreeDelivery(res.data.freeDelivery);
          setCashOnDelivery(res.data.cashOnDelivery);
          setReturnDuration(res.data.returnDuration);
          setWarranty(res.data.warranty);
          setWarrantyDuration(res.data.warrantyDuration);

          setProductId(res.data._id);
          setTags(res.data.tags);
          setTitle(res.data.title);
          setDescription(res.data.description);
          const yo = convertFromRaw(JSON.parse(res.data.description));

          setEditor(EditorState.createWithContent(yo));
          setPrice(res.data.price);
          setOffer(res.data.offer);
          setStock(res.data.stock);
          setCategory(res.data.category);
          setSubCategory(res.data.subCategory);
          setStatus(res.data.status);
          setSizeList(res.data.sizeList);
          let userImages = res.data.images;
          let i = 0;
          res.data.images.forEach((item: string) => {
            userImages[i] = item;
            i++;
          });
          setCategory(res.data.category);
          instance
            .get(`/product/sub-categories/${res.data.category}`)
            .then((res) => {
              setSubCategoryList(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setSubCategory(res.data.subCategory);
          setMainImage(userImages[0]);
          setImages(userImages);
          setLoadingState(false);
          const loader = document.querySelector("#loader") as HTMLDivElement;
          const content = document.querySelector("#content") as HTMLDivElement;
          loader.classList.add("hidden");
          loader.classList.remove("flex");
          content.classList.remove("hidden");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
  }, [productChange]);

  useLayoutEffect(() => {
    if (width > 1280) {
      const main = document.querySelector("#main") as HTMLDivElement;
      const similarProducts = document.querySelector(
        "#similar_products"
      ) as HTMLDivElement;

      console.log(main.scrollHeight);
      similarProducts.style.height = `${main.scrollHeight}px`;
    }
  });

  return (
    <>
      <div
        className=" flex h-[100vh] items-center justify-center border border-black"
        id="loader"
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#002663"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>

      <article id="content" className="hidden ">
        <section className="hidden h-96   max-md:block">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {images.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <img
                    src={image}
                    className="h-96 w-[100%] object-contain"
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <div className="grid  grid-cols-[1.5fr,2fr,1fr] max-xl:grid-cols-[1fr,1.5fr]  max-lg:text-sm max-md:grid-cols-1 max-md:grid-rows-1">
          {/* image section */}
          <section className="flex flex-row-reverse gap-5 px-10 py-32 max-lg:pt-16 max-md:hidden">
            <span className="py-5 ">
              <img
                src={mainImage}
                alt={title}
                className="h-96 w-96 cursor-pointer object-contain shadow"
              />
            </span>
            <span className=" flex flex-col gap-5 " id="images">
              {images.map((item, i) => (
                <img
                  src={item}
                  key={i}
                  alt={title}
                  className={
                    i === 0
                      ? "h-14 w-14 cursor-pointer border-2 border-black object-contain"
                      : "h-14 w-14 cursor-pointer  border object-contain"
                  }
                  onMouseOver={() => {
                    setMainImage(item);
                    highlightSelected(i);
                  }}
                />
              ))}
            </span>
          </section>

          {/* text section */}
          <section className="flex flex-col   max-lg:pt-3" id="main">
            <h1 className="border-b border-gray-300  p-3 text-3xl font-semibold  max-lg:text-2xl max-vs:text-xl max-vs:font-medium ">
              {title}
            </h1>
            <span className="border-b border-gray-300 p-3  text-xl max-lg:text-lg">
              <Rating
                initialRating={3.5}
                emptySymbol={<BsStar color="orange" />}
                fullSymbol={<BsStarFill color="orange" />}
                readonly
              />
            </span>

            <div className="flex flex-col  gap-1 border-b border-gray-300 p-3 ">
              {offer! > 0 ? (
                <span className="">
                  <span className="flex gap-3 text-2xl max-lg:text-xl">
                    <h4 className="text-red-700">-{offer}%</h4>
                    <h4 className="">
                      ₹{Math.round(price - (offer / 100) * price)}
                    </h4>
                  </span>
                  <span className="flex gap-2 text-sm text-gray-600 max-lg:text-xs">
                    <h4>M.R.P.:</h4>
                    <h4 className=" line-through">₹{price}</h4>
                  </span>
                </span>
              ) : (
                <h4 className="text-2xl max-lg:text-xl">₹ {price}</h4>
              )}
              <p className="text-sm text-gray-700 max-lg:text-xs">
                Inclusive of all taxes
              </p>
            </div>
            {(freeDelivery || cashOnDelivery || returnPolicy || warranty) && (
              <div className="flex flex-wrap gap-5 border-b border-gray-300  p-3 text-sm max-lg:text-xs">
                {freeDelivery && (
                  <span className="flex flex-col items-center gap-2">
                    <FcShipped className="rounded-full border border-gray-300 p-2 text-6xl max-lg:text-5xl" />
                    <p>Free Delivery</p>
                  </span>
                )}
                {cashOnDelivery && (
                  <span className="flex flex-col items-center gap-2">
                    <FcMoneyTransfer className="rounded-full border border-gray-300 p-2 text-6xl max-lg:text-5xl" />
                    <p>Cash On Delivery</p>
                  </span>
                )}
                {returnPolicy && (
                  <span className="flex flex-col items-center gap-2">
                    <FcPaid className="rounded-full border border-gray-300 p-2 text-6xl max-lg:text-5xl" />
                    <p>Return {returnDuration} days</p>
                  </span>
                )}
                {warranty && (
                  <span className="flex flex-col items-center gap-2">
                    <FcApproval className="rounded-full border border-gray-300 p-2 text-6xl max-lg:text-5xl" />
                    <p>Warranty for {warrantyDuration} Year</p>
                  </span>
                )}
              </div>
            )}
            {sizeList.length !== 0 && (
              <div className="flex flex-col  gap-5 border-b border-gray-300 p-3">
                <h2 className="text-lg max-lg:text-base">Sizes:</h2>
                <section className="flex  flex-wrap gap-5">
                  {sizeList.map((item, i) => (
                    <span
                      key={i}
                      className={
                        "cursor-pointer rounded border border-gray-400 py-2 px-10 text-gray-400 hover:border-black hover:text-black "
                      }
                      onClick={() => {
                        setSize(item);
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </section>
              </div>
            )}
            <div>
              <Editor
                editorState={editor}
                toolbarStyle={{ display: "none" }}
                readOnly={true}
              />
            </div>

            <span className=" m-auto flex gap-5 py-5 max-vs:flex-col">
              <button
                className="rounded border border-gray-400 px-5 py-2 shadow max-vs:m-auto"
                onClick={() => navigate("/checkout?p=" + productId)}
              >
                Buy Now
              </button>
              <button
                className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow max-vs:m-auto"
                onClick={() => {
                  addItemToCart(`${productId}`);
                  window.location.reload();
                }}
              >
                Add to Cart
              </button>
            </span>
          </section>
          {/* Similar Products section */}

          <section
            className="flex  flex-col gap-5 overflow-auto  p-5 max-xl:hidden"
            id="similar_products"
          >
            <h1 className="text-center text-3xl font-semibold max-lg:text-2xl">
              Similar Products
            </h1>
            <span className="flex flex-col gap-5 ">
              {products.map(
                (item, i) =>
                  item.category === category && (
                    <div
                      className="flex  cursor-pointer flex-col gap-5 border p-3 text-center shadow transition-transform hover:scale-105"
                      onClick={() => {
                        navigate(`/product?p=${item?._id}`);
                        setProductChange(!productChange);
                      }}
                      key={i}
                    >
                      <img
                        src={item.images[0]}
                        alt=""
                        className="m-auto h-32 w-32  object-contain"
                      />
                      <span className="flex flex-col gap-2">
                        <h1 className="font-medium line-clamp-1">
                          {item.title}
                        </h1>
                        <p className="text-xs text-gray-700 line-clamp-2">
                          {JSON.parse(item.description).blocks[0].text}
                        </p>
                      </span>
                      <span className="flex justify-center gap-1">
                        <h4>Price: ₹</h4>

                        {item.offer > 0 ? (
                          <>
                            <h4 className="text-red-700 line-through">{`${item.price}`}</h4>
                            <h4 className="">{`${Math.round(
                              item.price - (item.offer / 100) * item.price
                            )}`}</h4>
                          </>
                        ) : (
                          <h4 className="">{`${item.price}`}</h4>
                        )}
                      </span>
                    </div>
                  )
              )}
            </span>
          </section>
        </div>
        <section className="hidden  border-t py-5  max-xl:block">
          <h1 className="text-center text-3xl font-semibold underline underline-offset-8 max-lg:text-2xl">
            Similar Products
          </h1>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={1}
            navigation
            breakpoints={{
              500: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 4,
              },
              1600: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={20}
            className=" px-10 py-5"
          >
            {products.map(
              (item, i) =>
                item.category === category && (
                  <SwiperSlide
                    className="flex  cursor-pointer flex-col gap-5 border p-3 text-center shadow transition-transform hover:scale-105"
                    onClick={() => {
                      navigate(`/product?p=${item?._id}`);
                      setProductChange(!productChange);
                    }}
                    key={i}
                  >
                    <img
                      src={item.images[0]}
                      alt=""
                      className="m-auto h-32 w-32  object-contain"
                    />
                    <span className="flex flex-col gap-2">
                      <h1 className="font-medium line-clamp-1">{item.title}</h1>
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {JSON.parse(item.description).blocks[0].text}
                      </p>
                    </span>
                    <span className="flex justify-center gap-1">
                      <h4>Price: ₹</h4>

                      {item.offer > 0 ? (
                        <>
                          <h4 className="text-red-700 line-through">{`${item.price}`}</h4>
                          <h4 className="">{`${Math.round(
                            item.price - (item.offer / 100) * item.price
                          )}`}</h4>
                        </>
                      ) : (
                        <h4 className="">{`${item.price}`}</h4>
                      )}
                    </span>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </section>
      </article>
    </>
  );
}
