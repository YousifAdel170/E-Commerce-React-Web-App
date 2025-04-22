// Import necessary hooks and functions from React and Redux
import { useDispatch, useSelector } from "react-redux";

// Import action creators to dispatch specific product, category, and brand data
import {
  getProductsLikeThis,
  getSpecificProduct,
} from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect, useMemo } from "react";

// Import assets for default image
import mobile from "../../Assets/Imgs/mobile.png";

// Import actions to fetch specific category and brand data
import { getSpecificCategory } from "../../redux/actions/categoryAction";
import { getSpecificBrand } from "../../redux/actions/brandAction";

// Custom hook responsible for fetching and managing product details data
const ViewProductDetailsHook = (productID) => {
  // Initialize dispatch to interact with Redux actions
  const dispatch = useDispatch();

  // Fetch product data only once when the component mounts
  useEffect(() => {
    // Check for internet connection before proceeding
    internetDetect();

    // Dispatch the action to fetch the specific product based on productID
    const getData = async () => await dispatch(getSpecificProduct(productID));

    getData();
  }, [dispatch, productID]);

  // Select the product, category, brand, and related products data from the Redux store
  const products = useSelector((state) => state.allProduct.viewSpecificProduct);
  const category = useSelector(
    (state) => state.allCategory.viewSpecificCategory
  );
  const brand = useSelector((state) => state.allBrand.viewSpecificBrand);
  const productsLike = useSelector(
    (state) => state.allProduct.viewProductsLike
  );

  // Memoize the product details to avoid unnecessary re-renders
  const itemProduct = useMemo(() => {
    if (products && products.data) return products.data;
    else return [];
  }, [products]);

  // Dispatch actions to fetch products similar to the current product's category
  useEffect(() => {
    const getData = async () => {
      // If product has a category, fetch products that belong to the same category
      if (itemProduct && itemProduct.category)
        await dispatch(getProductsLikeThis(itemProduct.category));
    };

    getData();
  }, [dispatch, itemProduct]);

  // Dispatch action to fetch the specific category of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a category, fetch the category details
      if (itemProduct && itemProduct.category)
        await dispatch(getSpecificCategory(itemProduct.category));
    };

    getData();
  }, [dispatch, itemProduct]);

  // Dispatch action to fetch the specific brand of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a brand, fetch the brand details
      if (itemProduct && itemProduct.brand)
        await dispatch(getSpecificBrand(itemProduct.brand));
    };

    getData();
  }, [dispatch, itemProduct]);

  // Memoize the product images and set a default image if no images are available
  const images = useMemo(() => {
    if (itemProduct && itemProduct.images) {
      return itemProduct.images.map((image) => {
        return { original: image };
      });
    } else return [{ original: `${mobile}` }];
  }, [itemProduct]);

  // Memoize the category details of the product
  const itemCategory = useMemo(() => {
    if (category && category.data) return category.data;
    else return [];
  }, [category]);

  // Memoize the brand details of the product
  const itemBrand = useMemo(() => {
    if (brand && brand.data) return brand.data;
    else return [];
  }, [brand]);

  // Memoize the related products in the same category, limiting the number of displayed items to 4
  const prodouctsLikeSample = useMemo(() => {
    if (productsLike && productsLike.data)
      return productsLike.data.length > 4
        ? productsLike.data.slice(0, 4) // Show at most 4 related products
        : productsLike.data;
    else return [];
  }, [productsLike]);

  // Return the necessary data for the component to use
  return [itemProduct, images, itemCategory, itemBrand, prodouctsLikeSample];
};

// Export the custom hook for use in other components
export default ViewProductDetailsHook;
