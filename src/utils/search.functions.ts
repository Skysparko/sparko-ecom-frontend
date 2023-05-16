import { productType } from "../redux/product.slice";
import { subcategoryType } from "../redux/subCategory.slice";
import { instance } from "./functions";

export const getSearchResults = async (
  category: string,
  searchQuery: string,
  subCategory: string,
  setData: React.Dispatch<React.SetStateAction<productType[] | undefined>>,
  limit: number,
  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  setPageList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  try {
    const res = await instance.get(
      "/product/search?category=" +
        category +
        "&term=" +
        searchQuery +
        "&subCategory=" +
        subCategory
    );
    let data: Array<productType> = [];
    res.data.products.map((item: productType, key: number) => {
      limit * page - limit <= key && limit * page > key && data.push(item);
    });

    setData(data);
    setTotalPage(Math.ceil(res.data.products.length / limit));
    let pageList: Array<number> = [];
    for (let i = 1; i <= Math.ceil(res.data.products.length / limit); i++) {
      pageList.push(i);
    }
    setPageList(pageList);
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchSuggestions = async (
  category: string,
  searchQuery: string,
  setData: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const res = await instance.get(
      "/product/search?category=" +
        category +
        "&term=" +
        searchQuery +
        "&subCategory=" +
        ""
    );
    let data: Array<string> = [];
    res.data.products.map((p: productType) => data.push(p.title));
    setData(data);
  } catch (error) {
    console.log(error);
  }
};

export const handleSort = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setSort: React.Dispatch<React.SetStateAction<string>>,
  data: productType[] | undefined,
  category: string,
  searchQuery: string,
  setData: React.Dispatch<React.SetStateAction<productType[] | undefined>>,
  limit: number,

  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  setPageList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setSort(e.target.value);
  e.target.value === "low_to_high" &&
    data!.sort(function (a, b) {
      return a.price - b.price;
    });

  e.target.value === "high_to_low" &&
    data!.sort(function (a, b) {
      return b.price - a.price;
    });

  e.target.value === "" &&
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
};

export const handleSubCategoryClick = (
  e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string>>,
  setData: React.Dispatch<React.SetStateAction<productType[] | undefined>>,
  subCategories: subcategoryType[],
  category: string,
  searchQuery: string,
  limit: number,
  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  setPageList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setSelectedSubCategory(e.currentTarget.textContent!);

  const subCat = subCategories.find(
    (subCategory) => subCategory.name === e.currentTarget.textContent
  )!;

  getSearchResults(
    category,
    searchQuery,
    subCat?._id,
    setData,
    limit,
    page,
    setTotalPage,
    setPageList
  );
};

export const handleDiscountChange = async (
  selectedSubCategory: string,
  setData: React.Dispatch<React.SetStateAction<productType[] | undefined>>,
  subCategories: subcategoryType[],
  category: string,
  searchQuery: string,

  offer: number,
  limit: number,
  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  setPageList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const subCat = subCategories.find(
    (subCategory) => subCategory.name === selectedSubCategory
  )!;
  let subCategory = "";
  if (subCat) {
    subCategory = subCat._id;
  }

  let data = await getSearchResults(
    category,
    searchQuery,
    subCategory,
    setData,
    limit,
    page,
    setTotalPage,
    setPageList
  );

  const result: Array<productType> = [];
  data.filter((item: productType) => {
    item.offer === offer && result.push(item);
  });

  setData(result);
};

export const getSearchResultUsingPriceRange = async (
  selectedSubCategory: string,
  setData: React.Dispatch<React.SetStateAction<productType[] | undefined>>,
  subCategories: subcategoryType[],
  category: string,
  searchQuery: string,
  minPrice: number,
  maxPrice: number,
  limit: number,
  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  setPageList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const subCat = subCategories.find(
    (subCategory) => subCategory.name === selectedSubCategory
  )!;
  let subCategory = "";
  if (subCat) {
    subCategory = subCat._id;
  }

  let data = await getSearchResults(
    category,
    searchQuery,
    subCategory,
    setData,
    limit,
    page,
    setTotalPage,
    setPageList
  );

  const result: Array<productType> = [];
  data.filter((item: productType) => {
    item.price > minPrice && item.price < maxPrice && result.push(item);
  });

  setData(result);
};
