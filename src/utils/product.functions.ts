import { EditorState } from "draft-js";
import { dialogBoxPropsType } from "../components/utils/DialogBox";
import { instance } from "./functions";

export const submitNewProduct = (
  tags: Array<string>,
  images: Array<[]>,
  title: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  status: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stock: number,
  offer: number,
  freeDelivery: boolean,
  cashOnDelivery: boolean,
  returnPolicy: boolean,
  returnDuration: number,
  warranty: boolean,
  warrantyDuration: number,
  sizeList: Array<string>
) => {
  setIsLoading(true);
  instance
    .post("product/create", {
      tags,
      images,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
      freeDelivery,
      cashOnDelivery,
      returnPolicy,
      returnDuration,
      warranty,
      warrantyDuration,
      sizeList,
    })
    .then((response) => {
      console.log(response);
      // location.href = "/dashboard/products";
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      setShowResponse(true);
      setResponse({
        type: "error",
        message: error.response.data,
      });
      console.log(error);
    });
};

export const updateProduct = (
  tags: Array<string>,
  images: Array<[]>,
  title: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  status: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stock: number,
  offer: number,
  id: string,
  freeDelivery: boolean,
  cashOnDelivery: boolean,
  returnPolicy: boolean
) => {
  console.log(description);

  setIsLoading(true);
  instance
    .put(`product/update/${id}`, {
      tags,
      images,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
      freeDelivery,
      cashOnDelivery,
      returnPolicy,
    })
    .then((response) => {
      console.log(response);
      // location.href = "/dashboard/products";
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      setShowResponse(true);
      setResponse({
        type: "error",
        message: error.response.data,
      });
      console.log(error);
    });
};

// function to fetch all the address using UserId
export const fetchAllProducts = async () => {
  try {
    const res = await instance.get("/product/");

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//delete a product from the database
export const deleteProduct = async (id: string) => {
  try {
    const res = await instance.delete(`product/delete/${id}`);
    location.reload();
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
