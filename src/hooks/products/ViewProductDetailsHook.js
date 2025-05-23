// Import necessary hooks and functions from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

// Import Custom Hooks
import ViewSpecificProductHook from "./ViewSpecificProductHook";

// Import assets for default image
import mobile from "../../Assets/Imgs/mobile.png";

// Import actions to fetch specific category and brand data
import { getSpecificBrand } from "../../redux/actions/brandAction";
import { getSpecificCategory } from "../../redux/actions/categoryAction";
import { getProductsLikeThis } from "../../redux/actions/productsAction";

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
      if (specificProduct)
        await dispatch(getProductsLikeThis(specificProduct?.category));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Dispatch action to fetch the specific category of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a category, fetch the category details
      if (specificProduct)
        await dispatch(getSpecificCategory(specificProduct?.category));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Dispatch action to fetch the specific brand of the product
  useEffect(() => {
    const getData = async () => {
      // If product has a brand, fetch the brand details
      if (specificProduct)
        await dispatch(getSpecificBrand(specificProduct?.brand));
    };

    getData();
  }, [dispatch, specificProduct]);

  // Memoize the product images and set a default image if no images are available
  const images = useMemo(() => {
    if (specificProduct?.images) {
      return specificProduct.images.map((image) => {
        return { original: image };
      });
    } else return [{ original: `${mobile}` }];
  }, [specificProduct]);

  // Memoize the category details of the product
  const itemCategory = useMemo(() => {
    if (category) return category?.data;
    else return [];
  }, [category]);

  // Memoize the brand details of the product
  const itemBrand = useMemo(() => {
    if (brand) return brand?.data;
    else return [];
  }, [brand]);

  // Memoize the related products in the same category, limiting the number of displayed items to 4
  const prodouctsLikeSample = useMemo(() => {
    if (productsLike?.data)
      return productsLike?.data?.length > 4
        ? productsLike?.data.slice(0, 4) // Show at most 4 related products
        : productsLike?.data;
    else return [];
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
