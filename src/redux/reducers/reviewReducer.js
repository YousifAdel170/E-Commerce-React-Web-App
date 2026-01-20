// Import types
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  GET_ALL_PRODUCTS_REVIEWS,
  GET_ERROR,
  RESET_STATE_REVIEW,
  UPDATE_REVIEW,
} from "../type";

// Initial State
const initialState = {
  createdReview: null,
  viewAllReviews: null,
  deletedReview: null,
  updatedReview: null,
  loading: {
    fetchAll: true,
    create: true,
    delete: true,
    update: true,
  },

  error: {
    fetchAll: null,
    create: null,
    delete: null,
    update: null,
  },
};

// Review Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    // get all products reviews
    case GET_ALL_PRODUCTS_REVIEWS:
      return {
        ...state,
        viewAllReviews: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    // Create Review
    case CREATE_REVIEW:
      return {
        ...state,
        createdReview: action.payload,
        viewAllReviews: {
          ...state.viewAllReviews,
          data: [
            ...(state.viewAllReviews.data || []),
            action.payload?.data?.data,
          ],
          paginationResult: state.viewAllReviews.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    // Delete Review
    case DELETE_REVIEW:
      return {
        ...state,
        deletedReview: action.payload,
        viewAllReviews: {
          ...state.viewAllReviews,
          data: state.viewAllReviews.data.filter(
            (b) => b._id !== action.payload.id,
          ),
          paginationResult: state.viewAllReviews.paginationResult,
        },
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    // Update Review
    case UPDATE_REVIEW: {
      return {
        ...state,
        updatedReview: action.payload,
        viewAllReviews: state.viewAllReviews
          ? {
              ...state.viewAllReviews,
              data: state.viewAllReviews.data.map((review) =>
                review._id === action.payload?.data?.data?._id
                  ? action.payload?.data?.data
                  : review,
              ),
            }
          : null,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
      };
    }

    case RESET_STATE_REVIEW:
      return {
        ...state,
        loading: {
          create: true,
          delete: true,
          update: true,
        },
        error: {
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

    //   Default
    default:
      return state;
  }
};

// Export the Review Reducer
export default reviewReducer;
