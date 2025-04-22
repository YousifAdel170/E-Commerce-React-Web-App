import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductRates } from "../../redux/actions/reviewAction";
import {
  PAGE_NUMBER_PRODUCT_DETAILS_RATES,
  PRODUCT_DETAILS_RATES_LIMIT,
} from "../../config";

const ViewAllRatesHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () =>
      await dispatch(
        getAllProductRates(
          id,
          PAGE_NUMBER_PRODUCT_DETAILS_RATES,
          PRODUCT_DETAILS_RATES_LIMIT
        )
      );

    getData();
  }, [dispatch, id]);

  const allRates = useSelector((state) => state.reviewReducer.getAllReviews);

  const onPress = async (page) =>
    await dispatch(getAllProductRates(id, page, PRODUCT_DETAILS_RATES_LIMIT));

  return [allRates, onPress];
};

export default ViewAllRatesHook;
