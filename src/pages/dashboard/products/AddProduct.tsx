import React, { useEffect, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { TagsInput } from "react-tag-input-component";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import DialogBox, {
  dialogBoxPropsType,
} from "../../../components/utils/DialogBox";
import { submitNewProduct } from "../../../utils/product.functions";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { categoryType } from "../../../redux/category.slice";
import { instance } from "../../../utils/functions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddProduct() {
  const [tags, setTags] = useState<Array<string>>([]);
  const [sizeList, setSizeList] = useState<Array<string>>([]);
  const [images, setImages] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(-1);
  const [offer, setOffer] = React.useState(-1);
  const [stock, setStock] = React.useState(-1);
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [status, setStatus] = React.useState("Public");
  const [editor, setEditor] = useState(() => EditorState.createEmpty());

  const [returnPolicy, setReturnPolicy] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [warranty, setWarranty] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const [returnDuration, setReturnDuration] = useState(0);
  const [warrantyDuration, setWarrantyDuration] = useState(0);

  const maxNumber = 7;
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "",
  });
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList as never[]);
  };

  const [subCategoryList, setSubCategoryList] = useState<
    Array<{
      _id: string;
      name: string;
      description: string;
      categoryID: string;
    }>
  >([]);

  function getSubCategoriesUsingCategory(category: string) {
    instance
      .get(`/product/sub-categories/${category}`)
      .then((res) => {
        setSubCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getting addresses from redux store
  const categoriesState = useSelector(
    (state: { category: { value: Array<categoryType>; loading: boolean } }) =>
      state.category
  );
  const { value: categories } = categoriesState ?? {};

  return (
    <article className="border border-black">
      <h1 className="py-5 text-center text-3xl font-semibold">
        Create a new Product
      </h1>
      <div className="grid grid-cols-[300px,1fr]  max-md:grid-cols-1 max-md:grid-rows-[240px,1fr]">
        <section className="flex flex-col   ">
          <ReactImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper  flex h-[38rem] flex-col items-center  overflow-y-auto   p-5 max-md:h-60 max-md:flex-row max-md:overflow-x-auto max-md:overflow-y-hidden max-md:px-3">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <span className="flex h-60 w-60 cursor-pointer  flex-col items-center justify-center gap-2 rounded-sm border border-sky-600 text-2xl text-sky-600 shadow max-md:mr-3 max-vxs:w-full">
                    <BsFillCameraFill />
                    <h2 className="text-base">
                      Click or Drop <br />
                      to add images
                    </h2>
                  </span>
                </button>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item relative mt-3 gap-3 max-md:mt-0 max-md:grid   max-md:grid-cols-[240px,1fr]"
                  >
                    <div className="image-item__btn-wrapper absolute right-0  grid grid-cols-2 gap-3 p-2 pr-4 ">
                      <button
                        onClick={() => onImageUpdate(index)}
                        className=" flex items-center justify-center gap-1 rounded border border-gray-400  bg-sky-700 p-2 text-white shadow"
                      >
                        <RiEdit2Line />
                      </button>
                      <button
                        onClick={() => onImageRemove(index)}
                        className=" flex items-center justify-center gap-1 rounded border border-gray-400 bg-red-700 p-2 text-white shadow"
                      >
                        <RiDeleteBin2Line />
                      </button>
                    </div>
                    <img
                      src={image.dataURL}
                      alt="Product Image"
                      className=" h-60 w-60 rounded border border-gray-200 object-contain shadow"
                    />
                  </div>
                ))}
                &nbsp;
                {imageList["length"] !== 0 && (
                  <button
                    onClick={onImageRemoveAll}
                    className="flex  items-center justify-center gap-1 rounded border border-gray-400 bg-red-700 p-2 text-white shadow-sm max-md:ml-3"
                  >
                    Remove all images
                  </button>
                )}
              </div>
            )}
          </ReactImageUploading>
        </section>

        <form
          className="flex flex-col gap-5 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            submitNewProduct(
              tags,
              images,
              title,
              description,
              price,
              category,
              subCategory,
              status,
              setResponse,
              setShowResponse,
              setIsLoading,
              stock,
              offer,
              freeDelivery,
              cashOnDelivery,
              returnPolicy,
              returnDuration,
              warranty,
              warrantyDuration,
              sizeList
            );
          }}
        >
          {showResponse && (
            <span className="m-auto">
              <DialogBox type={response.type} message={response.message} />
            </span>
          )}
          <span className="flex flex-col gap-1">
            <label htmlFor="product_title">Title:</label>
            <input
              type="text"
              id="product_title"
              className="rounded border border-gray-400 p-2 shadow-inner"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Product Title "
              required
            />
          </span>
          <span className="flex flex-col gap-1">
            <label htmlFor="product_description">Description:</label>
            <span
              className="rounded border border-gray-400 shadow"
              id="product_description"
            >
              <Editor
                editorState={editor}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditor}
                onChange={() => {
                  const data = editor.getCurrentContent();
                  setDescription(JSON.stringify(convertToRaw(data)));
                }}
              />
            </span>
          </span>
          <div className="grid grid-cols-2 gap-5 max-vs:grid-cols-1 max-vs:grid-rows-2">
            <span className="flex flex-col gap-1">
              <label htmlFor="product_price">Price:</label>
              <input
                type="number"
                id="product_price"
                className="rounded border border-gray-400 p-2 shadow-inner"
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter Product Price"
                required
              />
            </span>
            <span className="flex flex-col gap-1">
              <label htmlFor="product_offer">Offer:</label>
              <select
                name="product_offer"
                id="product_offer"
                className="rounded border border-gray-500 p-2"
                value={offer}
                required
                onChange={(e) => setOffer(Number(e.target.value))}
              >
                <option value="-1">--No Offer--</option>
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
          </div>
          <div className="grid grid-cols-2 gap-5 max-vs:grid-cols-1 max-vs:grid-rows-2">
            <span className="flex flex-col gap-1">
              <label htmlFor="product_category">Category:</label>
              <select
                name=""
                id="product_category"
                className="rounded border border-gray-500 p-2"
                defaultValue={""}
                onChange={(e) => {
                  const data = categories.find(
                    (category) => category.name == e.target.value
                  );
                  data?.name === "Clothing"
                    ? setShowSize(true)
                    : setShowSize(false);
                  setCategory(`${data?._id}`);
                  getSubCategoriesUsingCategory(`${data?._id}`);
                }}
                required
              >
                <option value="" disabled>
                  --Select Category--
                </option>
                {categories.map((category, i) => (
                  <option key={i}>{category.name}</option>
                ))}
              </select>
            </span>
            <span className="flex flex-col gap-1">
              <label htmlFor="product_sub_category">Sub category:</label>
              <select
                name="product_sub_category"
                id="product_sub_category"
                className="rounded border border-gray-500 p-2"
                defaultValue={""}
                onChange={(e) => {
                  const data = subCategoryList.find(
                    (category) => category.name == e.target.value
                  );

                  setSubCategory(`${data?._id}`);
                }}
                required
              >
                <option value="" disabled>
                  --Select sub category--
                </option>
                {subCategoryList.map((subCategory, i) => (
                  <option key={i}>{subCategory.name}</option>
                ))}
              </select>
            </span>
          </div>
          <span className="flex flex-col gap-1">
            <label htmlFor="product_tags">Tags:</label>
            <span>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="product_tags"
                placeHolder="Enter Keywords "
                isEditOnRemove={true}
              />
            </span>
          </span>
          <div className="grid grid-cols-2 gap-5 max-vs:grid-cols-1 max-vs:grid-rows-2">
            <span className="flex flex-col gap-1">
              <label htmlFor="product_stock">Stock:</label>
              <input
                type="number"
                id="product_stock"
                className="rounded border border-gray-400 p-2 shadow-inner"
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Enter no. of products in stock"
                required
              />
            </span>
            <span className="flex flex-col gap-1 ">
              <label htmlFor="product_status">Status:</label>
              <select
                name="product_status"
                id="product_status"
                className="rounded border border-gray-500 p-2"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={status}
                required
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </span>
          </div>
          <section className="grid grid-cols-2 gap-5 max-vs:grid-cols-1 max-vs:grid-rows-2 ">
            {showSize && (
              <div className="flex  flex-col gap-1 px-5">
                <h2>Available Sizes:</h2>
                <div className="flex flex-col gap-1 px-2">
                  <span className="flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id="Small"
                      onChange={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSizeList([...sizeList, "Small"]);
                        } else {
                          setSizeList(
                            sizeList.filter((item) => item !== "Small")
                          );
                        }
                      }}
                    />
                    <label htmlFor="Small">Small</label>
                  </span>
                  <span className="flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id="Medium"
                      onChange={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSizeList([...sizeList, "Medium"]);
                        } else {
                          setSizeList(
                            sizeList.filter((item) => item !== "Medium")
                          );
                        }
                      }}
                    />
                    <label htmlFor="Medium">Medium</label>
                  </span>
                  <span className="flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id="Large"
                      onChange={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSizeList([...sizeList, "Large"]);
                        } else {
                          setSizeList(
                            sizeList.filter((item) => item !== "Large")
                          );
                        }
                      }}
                    />
                    <label htmlFor="Large">Large</label>
                  </span>
                  <span className="flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id="extraLarge"
                      onChange={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSizeList([...sizeList, "extraLarge"]);
                        } else {
                          setSizeList(
                            sizeList.filter((item) => item !== "extraLarge")
                          );
                        }
                      }}
                    />
                    <label htmlFor="extraLarge">Extra Large</label>
                  </span>
                  <span className="flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id="2xl"
                      onChange={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSizeList([...sizeList, "2xLarge"]);
                        } else {
                          setSizeList(
                            sizeList.filter((item) => item !== "2xLarge")
                          );
                        }
                      }}
                    />
                    <label htmlFor="2xl">2xLarge</label>
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1 px-5">
              <h2>Available Services:</h2>
              <div className="flex flex-col gap-1 px-2">
                <span className="flex gap-1">
                  <input
                    type="checkbox"
                    name=""
                    id="free_delivery"
                    onChange={(e) => {
                      if ((e.target as HTMLInputElement).checked) {
                        setFreeDelivery(true);
                      } else {
                        setFreeDelivery(false);
                      }
                    }}
                  />
                  <label htmlFor="free_delivery">Free Delivery</label>
                </span>
                <span className="flex gap-1">
                  <input
                    type="checkbox"
                    name=""
                    id="pay_on_delivery"
                    onChange={(e) => {
                      if ((e.target as HTMLInputElement).checked) {
                        setCashOnDelivery(true);
                      } else {
                        setCashOnDelivery(false);
                      }
                    }}
                  />
                  <label htmlFor="pay_on_delivery">Pay on Delivery</label>
                </span>
                <span className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name=""
                    id="return_policy"
                    onChange={(e) => {
                      if ((e.target as HTMLInputElement).checked) {
                        setReturnPolicy(true);
                      } else {
                        setReturnPolicy(false);
                      }
                    }}
                  />

                  <label htmlFor="return_policy">Return Policy</label>
                  {returnPolicy && (
                    <span className="flex items-center gap-2">
                      <input
                        type="number"
                        name=""
                        className="w-12 rounded  border border-gray-500 p-1 shadow-inner"
                        onChange={(e) =>
                          setReturnDuration(Number(e.target.value))
                        }
                      />
                      <p>days</p>
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name=""
                    id="warranty"
                    onChange={(e) => {
                      if ((e.target as HTMLInputElement).checked) {
                        setWarranty(true);
                      } else {
                        setWarranty(false);
                      }
                    }}
                  />

                  <label htmlFor="warranty">Warranty</label>
                  {warranty && (
                    <span className="flex items-center gap-2">
                      <input
                        type="number"
                        name=""
                        className="w-12 rounded  border border-gray-500 p-1 shadow-inner"
                        onChange={(e) =>
                          setWarrantyDuration(Number(e.target.value))
                        }
                      />
                      <p>Year</p>
                    </span>
                  )}
                </span>
              </div>
            </div>
          </section>
          <button className="m-auto w-24 rounded border bg-blue-500 py-2 px-6 text-white shadow-md">
            {isLoading ? (
              <h1 className=" flex justify-center">
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
              </h1>
            ) : (
              <h1>Submit</h1>
            )}
          </button>
        </form>
      </div>
    </article>
  );
}
