import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductRates } from "../../redux/actions/reviewAction";

const ViewAllRatesHook = (id) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductRates(id, 1, 3));
    setLoading(false);
  }, [loading, dispatch, id]);

  const allRates = useSelector((state) => state.reviewReducer.getAllReviews);

  const onPress = async (page) => {
    await dispatch(getAllProductRates(id, page, 3));
  };

  return [allRates, onPress];
};

export default ViewAllRatesHook;
