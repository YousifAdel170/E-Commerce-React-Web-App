// Types
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  RESET_STATE_WISHLIST,
  VIEW_ALL_WISHLIST,
  GET_ERROR,
} from "../type";

// Initial State
const initialState = {
  addToWishList: null,
  removeFromWishList: null,
  viewAllWishList: null,

  loading: {
    fetchAll: false,
    create: false,
    delete: false,
  },

  error: {
    fetchAll: null,
    create: null,
    delete: null,
  },
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    // View All Wishlist
    case VIEW_ALL_WISHLIST:
      return {
        ...state,
        viewAllWishList: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    // Add to Wishlist
    case ADD_TO_WISHLIST:
      return {
        ...state,
        addToWishList: action.payload,
        viewAllWishList: {
          ...state.viewAllWishList,
          data: [
            ...(state.viewAllWishList?.data || []),
            // Convert array of IDs to objects with _id
            ...(Array.isArray(action.payload.data.data)
              ? action.payload.data.data.map((id) => ({ _id: id }))
              : []),
          ],
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    // Remove from Wishlist
    case DELETE_FROM_WISHLIST:
      return {
        ...state,
        removeFromWishList: action.payload,
        viewAllWishList: {
          ...state.viewAllWishList,
          data: (state.viewAllWishList?.data || []).filter(
            (item) => item._id !== action.payload.id
          ),
        },
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    // Errors
    case GET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.meta]: action.payload,
        },
        loading: {
          ...state.loading,
          [action.meta]: false,
        },
      };

    // Reset
    case RESET_STATE_WISHLIST:
      return {
        ...state,
        loading: {
          fetchAll: false,
          create: false,
          delete: false,
        },
        error: {
          fetchAll: null,
          create: null,
          delete: null,
        },
      };

    default:
      return state;
  }
};

export default wishListReducer;
