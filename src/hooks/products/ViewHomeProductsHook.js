import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect } from "react";

const ViewHomeProductsHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch Products only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.allProduct.viewProducts);

  let items = [];
  if (products.data) items = products.data.slice(0, 4);
  else items = [];

  return [items];
};

export default ViewHomeProductsHook;
