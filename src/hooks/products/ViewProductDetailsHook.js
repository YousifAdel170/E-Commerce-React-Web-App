// Import necessary hooks and functions from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

// Import Custom Hooks
import ViewSpecificProductHook from "./ViewSpecificProductHook";

// Import assets for default image
import defaultImage from "../../assets/Imgs/defaultImage.png";

// Import actions to fetch specific category and brand data
import { getSpecificBrand } from "../../redux/actions/brandAction";
import { getSpecificCategory } from "../../redux/actions/categoryAction";
import { getProductsLikeThis } from "../../redux/actions/productsAction";

// Import Used Constants
import { PAGE_PRODUCTS_HOME_LIMIT } from "../../constants/pageLimits";
import { EMPTY, ZERO } from "../../constants/general";

// Custom hook responsible for fetching and managing product details data
const ViewProductDetailsHook = (productID) => {
  // Initialize dispatch to interact with Redux actions
  const dispatch = useDispatch();

  // Get The Specific Product to display its details
  const [specificProduct] = ViewSpecificProductHook(productID);

  // Select the product, category, brand, and related products data from the Redux store
  const category = useSelector(
    (state) => state.allCategory.viewSpecificCategory
  );
  const brand = useSelector((state) => state.allBrand.viewSpecificBrand);
  const productsLike = useSelector(
    (state) => state.allProduct.viewProductsLike
  );

  // Dispatch actions to fetch products similar to the current product's category
  useEffect(() => {
    const getData = async () => {
      // If product has a category, fetch products that belong to the same category
      if (specificProduct?.category)
        await dispatch(getProductsLikeThis(specificProduct?.category));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Dispatch action to fetch the specific category of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a category, fetch the category details
      if (specificProduct?.category)
        await dispatch(getSpecificCategory(specificProduct?.category));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Dispatch action to fetch the specific brand of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a brand, fetch the brand details
      if (specificProduct?.brand)
        await dispatch(getSpecificBrand(specificProduct?.brand));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Memoize the product images and set a default image if no images are available
  const images = useMemo(() => {
    // Show spinner while images are not loaded yet
    if (!specificProduct || !specificProduct?.images) {
      return null; // return null to indicate "still loading"
    }

    // If no images exist (empty array), show default image
    if (specificProduct?.images?.length === ZERO) {
      return [{ original: defaultImage }];
    }

    // Otherwise, map actual images
    return specificProduct.images.map((image) => ({
      original: image,
    }));
  }, [specificProduct]);

  // Memoize the category details of the product
  const itemCategory = useMemo(() => {
    if (category) return category?.data;
    else return EMPTY.ARRAY;
  }, [category]);

  // Memoize the brand details of the product
  const itemBrand = useMemo(() => {
    if (brand) return brand?.data;
    else return EMPTY.ARRAY;
  }, [brand]);

  // Memoize the related products in the same category, limiting the number of displayed items
  const prodouctsLikeSample = useMemo(() => {
    if (productsLike?.data)
      return productsLike?.data?.length > PAGE_PRODUCTS_HOME_LIMIT
        ? productsLike?.data.slice(ZERO, PAGE_PRODUCTS_HOME_LIMIT)
        : productsLike?.data;
    else return EMPTY.ARRAY;
  }, [productsLike]);

  // Return the necessary data for the component to use
  return [
    specificProduct,
    images,
    itemCategory,
    itemBrand,
    prodouctsLikeSample,
  ];
};

// Export the custom hook for use in other components
export default ViewProductDetailsHook;
