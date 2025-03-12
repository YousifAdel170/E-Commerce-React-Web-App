import {
  ADD_COUPON,
  GET_ALL_COUPONS,
  DELETE_COUPON,
  GET_SPECIFIC_COUPON,
  UPDATE_COUPON,
} from "../type";

const initialState = {
  addCoupon: [],
  viewAllCoupons: [],
  deletedCoupon: [],
  specificCoupon: [],
  editCoupon: [],
  loading: true,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUPON:
      return { ...state, addCoupon: action.payload, loading: false };

    case GET_ALL_COUPONS:
      return { ...state, viewAllCoupons: action.payload, loading: false };

    case DELETE_COUPON:
      return { ...state, deletedCoupon: action.payload, loading: false };

    case GET_SPECIFIC_COUPON:
      return { ...state, specificCoupon: action.payload, loading: false };

    case UPDATE_COUPON:
      return { ...state, editCoupon: action.payload, loading: false };

    default:
      return state;
  }
};

export default couponReducer;
