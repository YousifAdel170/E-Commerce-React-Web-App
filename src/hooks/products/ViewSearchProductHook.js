import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect } from "react";

const ViewSearchProductHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch Products only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.allProduct.viewProducts);

  let items = [];
  if (products) items = products.data;
  else items = [];

  return [items];
};

export default ViewSearchProductHook;
