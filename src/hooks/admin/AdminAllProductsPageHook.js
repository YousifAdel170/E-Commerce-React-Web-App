import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import {
  getAllProducts,
  getAllProductsInSelectedPage,
} from "../../redux/actions/productsAction";
import { PAGE_PRODUCTS_LIMIT } from "../../config";

const AdminAllProductsPageHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch Products only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllProducts(PAGE_PRODUCTS_LIMIT));
  }, [dispatch]);

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

  const onPress = async (page) => {
    await dispatch(getAllProductsInSelectedPage(PAGE_PRODUCTS_LIMIT, page));
  };

  return [items, pageCount, onPress];
};

export default AdminAllProductsPageHook;
