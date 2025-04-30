// Import Hooks From React,  React Redux
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import The Used Actions From Redux
import {
  // getAllProducts,
  getAllProductsSearch,
} from "../../redux/actions/productsAction";

// Import The Used Config
import { PAGE_PRODUCTS_LIMIT } from "../../config";

// Hook Responsible for fetching and managing the products data after searching
const ViewSearchProductHook = () => {
  // Define the variables to store the data from the local storage
  let priceFromString = "",
    priceToString = "",
    word = "",
    queryCategory = "",
    queryBrand = "",
    priceTo = "",
    priceFrom = "",
    sortType = "",
    sort;

  // Function to get the searched word and other filters from local storage
  const getStorge = () => {
    // Get The searched word if there from the localstorage
    if (localStorage.getItem("searchedWord") != null)
      word = localStorage.getItem("searchedWord");

    // Get The category checked if there from the localstorage
    if (localStorage.getItem("categoryChecked") != null)
      queryCategory = localStorage.getItem("categoryChecked");

    // Get The brand checked if there from the localstorage
    if (localStorage.getItem("brandChecked") != null)
      queryBrand = localStorage.getItem("brandChecked");

    // Get The [Price To] if there from the localstorage
    if (localStorage.getItem("priceTo") != null)
      priceTo = localStorage.getItem("priceTo");

    // Get The [Price From] if there from the localstorage
    if (localStorage.getItem("priceFrom") != null)
      priceFrom = localStorage.getItem("priceFrom");

    // Set The Price From String [Query of the price From]
    if (priceFrom === "" || priceFrom <= 0) priceFromString = "";
    else priceFromString = `&price[gt]=${priceFrom}`;

    // Set The Price To String [Query of the price To]
    if (priceTo == "" || priceTo <= 0) priceToString = "";
    else priceToString = `&price[lte]=${priceTo}`;
  };

  // Function to get the sort type from local storage and set the sort variable
  const sortData = () => {
    // Get The sort type if there from the localstorage
    if (localStorage.getItem("sortType") !== null)
      sortType = localStorage.getItem("sortType");
    else sortType = "";

    // Check the sort type and set the sort variable to the value of the sort type
    if (sortType === "السعر من الاقل للاعلي") sort = "+price";
    else if (sortType === "السعر من الاعلي للاقل") sort = "-price";
    else if (sortType === "") sort = "";
    else if (sortType === "الاكثر مبيعا") sort = "-sold";
    else if (sortType === "الاعلي تقييما") sort = "-quantity";
  };

  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Get The Products at when there is searched
  const getProduct = async () => {
    // Get The Data From the Local Storage
    getStorge();

    // Gets the way of the sorting
    sortData();

    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${PAGE_PRODUCTS_LIMIT}&keyword=${word}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`
      )
    );
  };

  // Select Products from Redux
  const products = useSelector((state) => state.allProduct.viewProducts);

  //   To Get The Data
  const items = useMemo(() => {
    if (products) return products.data;
    else return [];
  }, [products]);

  //   To Get The Page number for pagination
  const pageCount = useMemo(() => {
    if (products && products.paginationResult)
      return products.paginationResult.numberOfPages;
    else return 0;
  }, [products]);

  //   To Get The number of results [products] after the search
  const results = useMemo(() => {
    if (products) return products.results;
    else return 0;
  }, [products]);

  // When the User Click On Pagination
  const onPress = async (page) => {
    // Get The Data From the Local Storage
    getStorge();

    // Gets the way of the sorting
    sortData();

    // Select The Products at this page
    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${PAGE_PRODUCTS_LIMIT}&page=${page}&keyword=${word}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`
      )
    );
  };

  // Return The Data To be used in the component
  return [items, pageCount, onPress, getProduct, results];
};

// Exporting The ViewSearchProductHook to be used in other components
export default ViewSearchProductHook;
