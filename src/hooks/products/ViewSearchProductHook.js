/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsSearch,
} from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect, useMemo } from "react";
import { PAGE_PRODUCTS_LIMIT } from "../../config";

const ViewSearchProductHook = () => {
  let priceFromString = "",
    priceToString = "",
    word = "",
    queryCategory = "",
    queryBrand = "",
    priceTo = "",
    priceFrom = "",
    sortType = "",
    sort;

  // Functions To Get All The Data From the Local Storage
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

  // Function of Getting the way of the sorting
  const sortData = () => {
    // Get All Sort Type From the Local Storage
    if (localStorage.getItem("sortType") !== null)
      sortType = localStorage.getItem("sortType");
    else sortType = "";

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

  // Fetch Products only once when the component mounts
  useEffect(() => {
    // Check the internet Connection
    internetDetect();

    // Dispatch All the Products with specific limit
    dispatch(getAllProducts(PAGE_PRODUCTS_LIMIT));
  }, []);

  // Select Products from Redux
  const products = useSelector((state) => state.allProduct.viewProducts);

  //   To Get The Data
  const items = useMemo(() => {
    if (products && products.data) return products.data;
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
    if (products && products.results) return products.results;
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

  return [items, pageCount, onPress, getProduct, results];
};

export default ViewSearchProductHook;
