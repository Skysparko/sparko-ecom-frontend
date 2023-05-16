import { instance } from "./functions";

// function to fetch all the categories
export const fetchAllCategories = async () => {
  try {
    const res = await instance.get("/product/categories");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// function to fetch all the categories
export const fetchAllSubCategories = async () => {
  try {
    const res = await instance.get("/product/sub-categories");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
