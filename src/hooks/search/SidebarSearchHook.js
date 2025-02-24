/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import ViewSearchProductHook from "../products/ViewSearchProductHook";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";

const SidebarSearchHook = () => {
  const [, , , getProduct] = ViewSearchProductHook();
  // UseRef to persist query values without causing re-renders
  const queryCategoryRef = useRef("");
  const queryBrandRef = useRef("");

  // State to Get The Checked Categories
  const [categoryChecked, setCategoryChecked] = useState([]);

  // State to Get The Checked Brands
  const [brandChecked, setBrandChecked] = useState([]);

  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch All The Categories and the brands at the beginning
  useEffect(() => {
    const dispatchData = async () => {
      // Dispatch All Categories [to be displayed for the user to select it for the search]
      await dispatch(getAllCategory());

      // Dispatch All Brands [to be displayed for the user to select it for the search]
      await dispatch(getAllBrand());
    };

    dispatchData();
  }, []);

  // Select The Categories & Brands From Redux
  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allBrand.brand);

  // To Get The Categories Data
  const categoriesData = useMemo(() => {
    if (category && category.data) return category.data;
    else return [];
  }, [category]);

  // To Get The Brands Data
  const brandsData = useMemo(() => {
    if (brand && brand.data) return brand.data;
    else return [];
  }, [brand]);

  //   When User Press Any Category
  const clickCategory = (e) => {
    let value = e.target.value;
    if (value === "0") setCategoryChecked([]);
    else {
      if (e.target.checked) setCategoryChecked([...categoryChecked, value]);
      else {
        const newArray = categoryChecked.filter((e) => e !== value);

        setCategoryChecked(newArray);
      }
    }
  };

  //   When User Press Any Brand
  const clickBrand = (e) => {
    let value = e.target.value;
    if (value === "0") setBrandChecked([]);
    else {
      if (e.target.checked) setBrandChecked([...brandChecked, value]);
      else {
        const newArray = brandChecked.filter((e) => e !== value);
        setBrandChecked(newArray);
      }
    }
  };

  // Set The Query of categories checked
  useEffect(() => {
    queryCategoryRef.current = categoryChecked
      .map((val) => `category[in][]=${val}`)
      .join("&");

    localStorage.setItem("categoryChecked", queryCategoryRef.current);

    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [categoryChecked]);

  // Set The Query of brands checked
  useEffect(() => {
    queryBrandRef.current = brandChecked
      .map((val) => `brand[in][]=${val}`)
      .join("&");

    localStorage.setItem("brandChecked", queryBrandRef.current);

    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [brandChecked]);

  // States to update the price from -> to
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

  // Get The Product after all the search being handled
  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [priceFromData, priceToData]);

  return [
    categoriesData,
    brandsData,
    clickCategory,
    clickBrand,
    priceFromUpdate,
    priceToUpdate,
  ];
};

export default SidebarSearchHook;
