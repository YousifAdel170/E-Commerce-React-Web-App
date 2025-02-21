import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect, useMemo } from "react";

const ViewHomeProductsHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch Products only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.allProduct.viewProducts);

  //   To Get The Data
  const items = useMemo(() => {
    if (products && products.data) return products.data.slice(0, 4);
    else return [];
  }, [products]);

  return [items];
};

export default ViewHomeProductsHook;
