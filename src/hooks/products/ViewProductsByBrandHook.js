// Import React hooks and Redux tools
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import custom hook to detect internet connection
import internetDetect from "../Utility/useInternetConnectionHook";

// Import Redux actions
import { getAllProductsByBrand } from "../../redux/actions/productsAction";
import { getSpecificBrand } from "../../redux/actions/brandAction";

// Import constants
import { PAGE_PRODUCTS_LIMIT } from "../../config";

// Custom hook to fetch products by a specific brand
const ViewProductsByBrandHook = (brandID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check the internet connection
    internetDetect();

    // Fetch products for the selected brand
    const getData = async () => {
      await dispatch(getAllProductsByBrand(PAGE_PRODUCTS_LIMIT, "", brandID));
    };

    getData();
  }, [dispatch, brandID]);

  // Handle pagination click
  const onPress = async (page) => {
    await dispatch(getAllProductsByBrand(PAGE_PRODUCTS_LIMIT, page, brandID));
  };

  // Select products by brand from Redux state
  const allProductsByBrand = useSelector(
    (state) => state.allProduct.viewProductsByBrand
  );

  // Select brand details from Redux state
  const brand = useSelector((state) => state.allBrand.viewSpecificBrand);

  useEffect(() => {
    // Fetch the specific brand details
    const getBrand = async () => await dispatch(getSpecificBrand(brandID));
    getBrand();
  }, [dispatch, brandID]);

  // Memoize the fetched items (products)
  const items = useMemo(() => {
    if (allProductsByBrand && allProductsByBrand.data)
      return allProductsByBrand.data;
    else return [];
  }, [allProductsByBrand]);

  // Memoize the number of pages for pagination
  const pageCount = useMemo(() => {
    if (allProductsByBrand && allProductsByBrand.paginationResult)
      return allProductsByBrand.paginationResult.numberOfPages;
    else return 0;
  }, [allProductsByBrand]);

  // Memoize the brand name
  const brandName = useMemo(() => {
    if (brand && brand.data) return brand.data.name;
    else return "";
  }, [brand]);

  // Return hook values to the component
  return [items, pageCount, onPress, brandName];
};

export default ViewProductsByBrandHook;
