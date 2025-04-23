import { useEffect, useState } from "react";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getSpecificProduct } from "../../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";

const ViewSpecificProductHook = (productID) => {
  // Initialize dispatch to interact with Redux actions
  const dispatch = useDispatch();

  const [specificProduct, setSpecificProduct] = useState([]);

  // Fetch product data only once when the component mounts using its ID
  useEffect(() => {
    // Check for internet connection before proceeding
    internetDetect();

    // Dispatch the action to fetch the specific product based on productID
    const getData = async () => await dispatch(getSpecificProduct(productID));

    getData();
  }, [dispatch, productID]);

  // Select the  product details from the Redux store
  const { viewSpecificProduct, loading } = useSelector(
    (state) => state.allProduct
  );

  useEffect(() => {
    if (!loading?.fetchSpecific) {
      if (viewSpecificProduct) setSpecificProduct(viewSpecificProduct.data);
      else setSpecificProduct([]);
    }
  }, [loading, viewSpecificProduct]);

  return [specificProduct];
};

export default ViewSpecificProductHook;
