import {
  ADD_COUPON,
  GET_ALL_COUPONS,
  DELETE_COUPON,
  GET_SPECIFIC_COUPON,
  UPDATE_COUPON,
  GET_ERROR,
  RESET_STATE,
} from "../type";

// Initial state for coupon reducer
const initialState = {
  addCoupon: [], // State for added coupon
  viewAllCoupons: [], // State for viewing all coupons
  deletedCoupon: [], // State for deleted coupon
  specificCoupon: [], // State for a specific coupon
  updatedCoupon: [], // State for edited coupon
  loading: {
    fetchAll: true,
    fetchSpecific: true,
    create: true,
    delete: true,
    update: true,
  },

  error: {
    fetchAll: null,
    fetchSpecific: null,
    create: null,
    delete: null,
    update: null,
  },
};

// Reducer function to handle coupon actions
const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUPONS:
      return {
        ...state,
        viewAllCoupons: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_COUPON:
      // Handle getting a specific coupon
      return {
        specificCoupon: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case ADD_COUPON:
      // // Handle adding a coupon
      // return { ...state, addCoupon: action.payload, loading: false };
      return {
        ...state,
        addCoupon: action.payload,
        viewAllCoupons: {
          ...state.viewAllCoupons,
          data: [...(state.viewAllCoupons.data || []), action.payload],
          paginationResult: state.viewAllCoupons.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETE_COUPON:
      return {
        ...state,
        viewAllCoupons: {
          ...state.viewAllCoupons,
          data: state.viewAllCoupons.data.filter(
            (b) => b._id !== action.payload.id
          ),
        },
        deletedCoupon: action.payload.response,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATE_COUPON:
      return {
        ...state,
        updatedCoupon: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
      };

    case RESET_STATE:
      return {
        ...state,
        loading: {
          fetchAll: true,
          fetchSpecific: true,
          create: true,
          delete: true,
          update: true,
        },
        error: {
          fetchAll: null,
          fetchSpecific: null,
          create: null,
          delete: null,
          update: null,
        },
      };

    case GET_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta]: false,
        },
        error: {
          ...state.error,
          [action.meta]: action.payload,
        },
      };

    default:
      // Return the current state if action type is not recognized
      return state;
  }
};

export default couponReducer;
