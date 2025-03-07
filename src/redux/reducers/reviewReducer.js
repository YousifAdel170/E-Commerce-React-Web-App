// Import types
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  GET_ALL_PRODUCTS_REVIEWS,
  UPDATE_REVIEW,
} from "../type";

// Initial State
const initialState = {
  createReview: [],
  getAllReviews: [],
  deleteReview: [],
  updateReview: [],
  loading: true,
};

// Review Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Review
    case CREATE_REVIEW:
      return { ...state, createReview: action.payload, loading: false };

    // get all products reviews
    case GET_ALL_PRODUCTS_REVIEWS:
      return { ...state, getAllReviews: action.payload, loading: false };

    // Delete Review
    case DELETE_REVIEW:
      return { ...state, deleteReview: action.payload, loading: false };

    // Update Review
    case UPDATE_REVIEW:
      return { ...state, updateReview: action.payload, loading: false };

    //   Default
    default:
      return state;
  }
};

// Export the Review Reducer
export default reviewReducer;
