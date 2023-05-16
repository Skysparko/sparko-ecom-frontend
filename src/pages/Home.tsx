import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, productType } from "../redux/product.slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
// import SimpleImageSlider from "react-simple-image-slider/dist/ImageSlider";
// import SimpleImageSlider from "react-simple-image-slider";
import bg1 from "../assets/images/temp/bg1.jpg";
import bg2 from "../assets/images/temp/bg2.jpg";
import bg3 from "../assets/images/temp/bg3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/parallax";
import { categoryType, getAllCategories } from "../redux/category.slice";
import { addItemToCart } from "../utils/cart.functions";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFlip,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  Autoplay,
} from "swiper";
import { getAllCartItems } from "../redux/cart.slice";

export default function Home() {
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
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};

  // getting categories from redux store
  const categoriesState = useSelector(
    (state: { category: { value: Array<categoryType>; loading: boolean } }) =>
      state.category
  );
  const { value: categories } = categoriesState ?? {};

  // console.log(categories);

  const images = [
    {
      url: bg1,
    },
    {
      url: bg2,
    },
    {
      url: bg3,
    },
  ];
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );

  useEffect(() => {
    setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
    // return clearInterval(interval);
  }, []);

  return (
    <div className=" bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        <SwiperSlide>
          <img src={bg1} alt="" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src={bg2} alt="" />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src={bg3} alt="" />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>

      {categories.map(
        (category, index) =>
          category.name !== "Other" &&
          index < 4 && (
            <div
              key={index}
              className="my-5 border border-gray-400 bg-white py-5"
            >
              <span className="mb-5 ml-5 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold ">{category.name}</h1>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {category.description}
                </p>
              </span>
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                slidesPerView={1}
                navigation
                breakpoints={{
                  680: {
                    slidesPerView: 2,
                  },
                  970: {
                    slidesPerView: 3,
                  },
                  1270: {
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
                    item.category === category._id && (
                      <SwiperSlide
                        key={i}
                        className=" flex cursor-pointer flex-col gap-5 rounded border border-gray-400 bg-white p-5 text-center shadow-sm shadow-gray-400 transition-transform hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`product?p=${item._id}`);
                        }}
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
                        <span className="flex gap-1">
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
                        <span className="m-auto flex gap-2">
                          <button
                            className="rounded border border-gray-400 px-5 py-2 shadow"
                            onClick={(e) => {
                              e.stopPropagation();
                              user.isAuthenticated
                                ? navigate("/checkout?p=" + item._id)
                                : navigate("/authentication");
                            }}
                          >
                            Buy Now
                          </button>
                          <button
                            className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (user.isAuthenticated) {
                                addItemToCart(item._id);
                                window.location.reload();
                              } else {
                                navigate("/authentication");
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        </span>
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </div>
          )
      )}
    </div>
  );
}
