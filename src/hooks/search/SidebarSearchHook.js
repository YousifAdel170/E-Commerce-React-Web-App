/* eslint-disable react-hooks/exhaustive-deps */

// Import Hooks From React,  React Redux
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import ViewSearchProductHook from "../products/ViewSearchProductHook";

// Import Custom Actions
import { getAllBrand } from "../../redux/actions/brandAction";

// Import Configuration
import { PAGE_BRANDS_LIMIT } from "../../config";

// Hook Responsible for managing the sidebar search functionality
const SidebarSearchHook = () => {
  // Get The Searched Word and other filters from local storage
  const [, , , getProduct] = ViewSearchProductHook();

  // Define the variables to store the data from the local storage
  const queryCategoryRef = useRef("");
  const queryBrandRef = useRef("");

  // Dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // States to manage the checked categories, brands and  price range
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [brandChecked, setBrandChecked] = useState([]);
  const [priceFromData, setPriceFromData] = useState(0);
  const [priceToData, setPriceToData] = useState(0);

  // Set The [Price From] into the local storage if there and update it
  const priceFromUpdate = (e) => {
    localStorage.setItem("priceFrom", e.target.value);
    setPriceFromData(e.target.value);
  };

  // Set The [Price To] into the local storage if there and update it
  const priceToUpdate = (e) => {
    localStorage.setItem("priceTo", e.target.value);
    setPriceToData(e.target.value);
  };

  // Useeffect to fetch all brands when the component mounts
  useEffect(() => {
    // Function to dispatch the action to get all brands
    const dispatchData = async () => {
      await dispatch(getAllBrand(PAGE_BRANDS_LIMIT));
    };

    // Call the dispatch function
    dispatchData();
  }, []);

  // Get The Category and Brand Data From Redux Store
  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allBrand.brand);

  // To Get The Categories Data
  const categoriesData = useMemo(() => {
    if (category) return category.data;
    else return [];
  }, [category]);

  // To Get The Brands Data
  const brandsData = useMemo(() => {
    if (brand) return brand.data;
    else return [];
  }, [brand]);

  // When User Press Any Category
  const clickCategory = (e) => {
    // Get the value of the clicked category
    let value = e.target.value;

    // If the value is "0", clear all checked categories
    if (value === "0") setCategoryChecked([]);
    // If the value is not "0", check if the checkbox is checked or unchecked
    else {
      // If the checkbox is checked, add the value to the categoryChecked array
      if (e.target.checked) setCategoryChecked([...categoryChecked, value]);
      // If the checkbox is unchecked, remove the value from the categoryChecked array
      else {
        const newArray = categoryChecked.filter((e) => e !== value);
        setCategoryChecked(newArray);
      }
    }
  };

  // When User Press Any Brand
  const clickBrand = (e) => {
    // Get the value of the clicked brand
    let value = e.target.value;

    // If the value is "0", clear all checked brands
    if (value === "0") setBrandChecked([]);
    // If the value is not "0", check if the checkbox is checked or unchecked
    else {
      // If the checkbox is checked, add the value to the brandChecked array
      if (e.target.checked) setBrandChecked([...brandChecked, value]);
      // If the checkbox is unchecked, remove the value from the brandChecked array
      else {
        const newArray = brandChecked.filter((e) => e !== value);
        setBrandChecked(newArray);
      }
    }
  };

  // useeffect to update the category and brand queries in local storage and trigger the getProduct function
  useEffect(() => {
    // Update Category query
    queryCategoryRef.current = categoryChecked
      .map((val) => `category[in][]=${val}`)
      .join("&");
    localStorage.setItem("categoryChecked", queryCategoryRef.current);

    // Update Brand query
    queryBrandRef.current = brandChecked
      .map((val) => `brand[in][]=${val}`)
      .join("&");
    localStorage.setItem("brandChecked", queryBrandRef.current);

    // Set timeout to trigger getProduct after 1 second delay
    const timeoutId = setTimeout(() => getProduct(), 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [categoryChecked, brandChecked, priceFromData, priceToData]);

  // Return the data to be used in the component
  return [
    categoriesData,
    brandsData,
    clickCategory,
    clickBrand,
    priceFromUpdate,
    priceToUpdate,
  ];
};

// Export the SidebarSearchHook function to be used in other components
export default SidebarSearchHook;
