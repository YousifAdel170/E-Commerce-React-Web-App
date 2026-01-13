// Import Hooks From React,  React Redux
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import The Used Actions From Redux
import {
  // getAllProducts,
  getAllProductsSearch,
} from "../../redux/actions/productsAction";

// Import The Used Config
import { PAGE_PRODUCTS_LIMIT } from "../../constants/pageLimits";
import { EMPTY, SORT_TYPES } from "../../constants/general";
import { STORAGE_KEYS } from "../../constants/storage";

// Hook Responsible for fetching and managing the products data after searching
const ViewSearchProductHook = () => {
  // Define the variables to store the data from the local storage
  let priceFromString = EMPTY.TEXT,
    priceToString = EMPTY.TEXT,
    word = EMPTY.TEXT,
    queryCategory = EMPTY.TEXT,
    queryBrand = EMPTY.TEXT,
    priceTo = EMPTY.TEXT,
    priceFrom = EMPTY.TEXT,
    sortType = EMPTY.TEXT,
    sort;

  // Function to get the searched word and other filters from local storage
  const getStorge = () => {
    // Get The searched word if there from the localstorage
    if (localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.SEARCHED_WORD) != null)
      word = localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.SEARCHED_WORD);

    // Get The category checked if there from the localstorage
    if (
      localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.CATEGORY_CHECKED) != null
    )
      queryCategory = localStorage.getItem(
        STORAGE_KEYS.LOCAL.PRODUCTS.CATEGORY_CHECKED
      );

    // Get The brand checked if there from the localstorage
    if (localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.BRAND_CHECKED) != null)
      queryBrand = localStorage.getItem(
        STORAGE_KEYS.LOCAL.PRODUCTS.BRAND_CHECKED
      );

    // Get The [Price To] if there from the localstorage
    if (localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.PRICE_TO) != null)
      priceTo = localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.PRICE_TO);

    // Get The [Price From] if there from the localstorage
    if (localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.PRICE_FROM) != null)
      priceFrom = localStorage.getItem(STORAGE_KEYS.LOCAL.PRODUCTS.PRICE_FROM);

    // Set The Price From String [Query of the price From]
    if (priceFrom === EMPTY.TEXT || priceFrom <= 0)
      priceFromString = EMPTY.TEXT;
    else priceFromString = `&price[gt]=${priceFrom}`;

    // Set The Price To String [Query of the price To]
    if (priceTo == EMPTY.TEXT || priceTo <= 0) priceToString = EMPTY.TEXT;
    else priceToString = `&price[lte]=${priceTo}`;
  };

  const getSortValue = (sortType) => {
    if (!sortType) return EMPTY.TEXT;

    const match = Object.values(SORT_TYPES).find(
      (item) => item.METHOD === sortType
    );

    return match ? match.VALUE : EMPTY.TEXT;
  };

  // Function to get the sort type from local storage and set the sort variable
  const sortData = () => {
    const storedSortType = localStorage.getItem(
      STORAGE_KEYS.LOCAL.PRODUCTS.SORT_TYPE
    );

    sortType = storedSortType ?? EMPTY.TEXT;
    sort = getSortValue(sortType);
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
    return products?.data || EMPTY.ARRAY;
  }, [products]);

  //   To Get The Page number for pagination
  const pageCount = useMemo(() => {
    return products?.paginationResult?.numberOfPages || 0;
  }, [products]);

  //   To Get The number of results [products] after the search
  const results = useMemo(() => {
    return products?.results || 0;
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
