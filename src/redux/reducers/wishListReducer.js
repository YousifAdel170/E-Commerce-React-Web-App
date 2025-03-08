// Import types
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  VIEW_ALL_WISHLIST,
} from "../type";

// Initial State
const initialState = {
  addToWishList: [],
  removeFromWishList: [],
  viewAllWishList: [],
  loading: true,
};

// WishList Reducer
const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add To WishList
    case ADD_TO_WISHLIST:
      return { ...state, addToWishList: action.payload, loading: false };

    //   Remove From WishList
    case DELETE_FROM_WISHLIST:
      return { ...state, removeFromWishList: action.payload, loading: false };

    //   View All WishList
    case VIEW_ALL_WISHLIST:
      return { ...state, viewAllWishList: action.payload, loading: false };

    //   Default
    default:
      return state;
  }
};

export default wishListReducer;
