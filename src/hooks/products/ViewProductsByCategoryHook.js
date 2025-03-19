import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByCategory } from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";

const ViewProductsByCategoryHook = (categoryID) => {
  const limit = 1;

  const dispatch = useDispatch();

  useEffect(() => {
    // Check the internet Connection
    internetDetect();

    const getData = async () => {
      await dispatch(getAllProductsByCategory(limit, "", categoryID));
    };

    getData();
  }, [dispatch, categoryID]);

  const onPress = async (page) => {
    await dispatch(getAllProductsByCategory(limit, page, categoryID));
  };

  const result = useSelector(
    (state) => state.allProduct.viewProductsByCategory
  );

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

export default ViewProductsByCategoryHook;
