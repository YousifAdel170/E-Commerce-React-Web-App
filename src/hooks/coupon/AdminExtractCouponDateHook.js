import { useSelector } from "react-redux";
import formatDate from "../Utility/formatDate";

const AdminExtractCouponDateHook = (coupon) => {
  // load the language from redux store
  const { lang } = useSelector((state) => state.ui);

  // Extract and format the expiration date of the coupon
  const date = formatDate(coupon?.expire, lang);

  return [date];
};

export default AdminExtractCouponDateHook;
