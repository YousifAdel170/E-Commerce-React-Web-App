import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getAllProductsByBrand } from "../../redux/actions/productsAction";

const ViewProductsByBrandHook = (brandID) => {
  const limit = 1;

  const dispatch = useDispatch();

  useEffect(() => {
    // Check the internet Connection
    internetDetect();

    const getData = async () => {
      await dispatch(getAllProductsByBrand(limit, "", brandID));
    };

    getData();
  }, [dispatch, brandID]);

  const onPress = async (page) => {
    await dispatch(getAllProductsByBrand(limit, page, brandID));
  };

  const result = useSelector((state) => state.allProduct.viewProductsByBrand);

  const items = useMemo(() => {
    if (result && result.data) return result.data;
    else return [];
  }, [result]);

  const pageCount = useMemo(() => {
    if (result && result.paginationResult)
      return result.paginationResult.numberOfPages;
    else return 0;
  }, [result]);

  return [items, pageCount, onPress];
};

export default ViewProductsByBrandHook;
