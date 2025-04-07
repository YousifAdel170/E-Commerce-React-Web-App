import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoupons,
  getAllCouponsInSelectedPage,
} from "../../redux/actions/couponAction";

const AdminViewAllCouponsHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Fetch all coupons when component mounts
  useEffect(() => {
    const getCoupons = async () => {
      await dispatch(getAllCoupons(1));
    };

    getCoupons();
  }, [dispatch]);

  // Selector to get all coupons from the Redux store
  const allCoupons = useSelector((state) => state.couponReducer.viewAllCoupons);

  // Memoize the coupons data
  const coupons = useMemo(() => {
    if (allCoupons && allCoupons.data) return allCoupons.data;
    else return [];
  }, [allCoupons]);

  // Memoize the coupons data
  const couponsPageCount = useMemo(() => {
    if (allCoupons && allCoupons.paginationResult)
      return allCoupons.paginationResult.numberOfPages;
    else return 0;
  }, [allCoupons]);

  // Handler for pagination button press
  const onPress = async (page) => {
    await dispatch(getAllCouponsInSelectedPage(1, page));
  };

  return [coupons, couponsPageCount, onPress]; // Return the coupons data and pagination handler
};

export default AdminViewAllCouponsHook;
