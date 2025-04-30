import {
  ADD_TO_CART,
  GET_ALL_CART_ITEMS,
  CLEAR_ALL_CART_ITEMS,
  DELETE_SPECIFIC_CART_ITEM,
  UPDATE_SPECIFIC_CART_ITEM,
  APPLY_COUPON,
} from "../type";

const initialState = {
  addToCart: [],
  allCartItems: [],
  clearCart: [],
  deletedCartItem: [],
  updatedCartItem: [],
  applyCoupon: [],
  loading: true,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, addToCart: action.payload, loading: false };

    case GET_ALL_CART_ITEMS:
      return { ...state, allCartItems: action.payload, loading: false };

    case CLEAR_ALL_CART_ITEMS:
      return {
        ...state,
        clearCart: action.payload,
        allCartItems: {
          status: "success",
          numOfCartItems: 0,
          data: {
            _id: null,
            products: [],
            totalCartPrice: 0,
            totalAfterDiscount: 0,
            coupon: "",
          },
        },
        loading: false,
      };

    case DELETE_SPECIFIC_CART_ITEM:
      return { ...state, deletedCartItem: action.payload, loading: false };

    case UPDATE_SPECIFIC_CART_ITEM:
      return { ...state, updatedCartItem: action.payload, loading: false };

    case APPLY_COUPON:
      return { ...state, applyCoupon: action.payload, loading: false };

    default:
      return state;
  }
};

export default cartReducer;
