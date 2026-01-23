import {
  ADD_TO_CART,
  GET_ALL_CART_ITEMS,
  CLEAR_ALL_CART_ITEMS,
  DELETE_SPECIFIC_CART_ITEM,
  UPDATE_SPECIFIC_CART_ITEM,
  APPLY_COUPON,
  RESET_STATE_CART,
  GET_ERROR,
} from "../type";

const initialState = {
  addToCart: [],
  allCartItems: [],
  clearCart: null,
  deletedCartItem: null,
  updatedCartItem: [],
  applyCoupon: [],
  loading: {
    fetchAll: true,
    clearAll: true,
    create: true,
    delete: true,
    coupon: true,
    update: true,
  },

  error: {
    fetchAll: null,
    clearAll: null,
    create: null,
    delete: null,
    coupon: null,
    update: null,
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case GET_ALL_CART_ITEMS:
      return {
        ...state,
        allCartItems: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case CLEAR_ALL_CART_ITEMS:
      return {
        ...state,
        clearCart: action.payload,
        allCartItems: null,
        loading: { ...state.loading, clearAll: false },
        error: { ...state.error, clearAll: null },
      };

    case DELETE_SPECIFIC_CART_ITEM: {
      const deletedProductId = action.payload.id;

      const updatedProducts =
        state.allCartItems?.data?.products?.filter(
          (item) => item._id !== deletedProductId,
        ) || [];

      return {
        ...state,
        allCartItems: {
          ...state.allCartItems,
          numOfCartItems: updatedProducts.length,
          data: {
            ...state.allCartItems.data,
            products: updatedProducts,
          },
        },
        deletedCartItem: action.payload.response,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };
    }

    case UPDATE_SPECIFIC_CART_ITEM:
      return {
        ...state,
        updatedCartItem: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
      };

    case APPLY_COUPON:
      return {
        ...state,
        applyCoupon: action.payload,
        loading: { ...state.loading, coupon: false },
        error: { ...state.error, coupon: null },
      };

    case RESET_STATE_CART:
      return {
        ...state,
        loading: {
          fetchAll: true,
          clearAll: true,
          create: true,
          delete: true,
          coupon: true,
          update: true,
        },

        error: {
          fetchAll: null,
          clearAll: null,
          create: null,
          delete: null,
          coupon: null,
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
      return state;
  }
};

export default cartReducer;
