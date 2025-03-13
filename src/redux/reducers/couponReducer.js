import {
  ADD_COUPON,
  GET_ALL_COUPONS,
  DELETE_COUPON,
  GET_SPECIFIC_COUPON,
  UPDATE_COUPON,
} from "../type";

// Initial state for coupon reducer
const initialState = {
  addCoupon: [], // State for added coupon
  viewAllCoupons: [], // State for viewing all coupons
  deletedCoupon: [], // State for deleted coupon
  specificCoupon: [], // State for a specific coupon
  editCoupon: [], // State for edited coupon
  loading: true, // State for loading status
};

// Reducer function to handle coupon actions
const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUPON:
      // Handle adding a coupon
      return { ...state, addCoupon: action.payload, loading: false };

    case GET_ALL_COUPONS:
      // Handle viewing all coupons
      return { ...state, viewAllCoupons: action.payload, loading: false };

    case DELETE_COUPON:
      // Handle deleting a coupon
      return { ...state, deletedCoupon: action.payload, loading: false };

    case GET_SPECIFIC_COUPON:
      // Handle getting a specific coupon
      return { ...state, specificCoupon: action.payload, loading: false };

    case UPDATE_COUPON:
      // Handle updating a coupon
      return { ...state, editCoupon: action.payload, loading: false };

    default:
      // Return the current state if action type is not recognized
      return state;
  }
};

export default couponReducer;
