import {
  GET_ALL_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_ORDER_PAY_STATUS,
  UPDATE_ORDER_DELIVER_STATUS,
  RESET_STATE,
  GET_ERROR,
} from "../type";

const initialState = {
  viewAllOrders: [],
  specificOrder: [],
  updatedOrderPayStatus: [],
  updatedOrderDeliverStatus: [],
  loading: {
    fetchAll: true,
    fetchSpecific: true,
    create: true,
    delete: true,
    update: {
      pay: true,
      deliver: true,
    },
  },

  error: {
    fetchAll: null,
    fetchSpecific: null,
    create: null,
    delete: null,
    update: {
      pay: null,
      deliver: null,
    },
  },
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        viewAllOrders: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_ORDER:
      return {
        ...state,
        specificOrder: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case UPDATE_ORDER_PAY_STATUS:
      return {
        ...state,
        updatedOrderPayStatus: action.payload,
        loading: {
          ...state.loading,
          update: { ...state.loading.update, pay: false },
        },
        error: {
          ...state.error,
          update: { ...state.error.update, pay: null },
        },
      };

    case UPDATE_ORDER_DELIVER_STATUS:
      return {
        ...state,
        updatedOrderDeliverStatus: action.payload,
        loading: {
          ...state.loading,
          update: { ...state.loading.update, deliver: false },
        },
        error: {
          ...state.error,
          update: { ...state.error.update, deliver: null },
        },
      };

    case RESET_STATE:
      return {
        ...state,
        loading: {
          fetchAll: true,
          fetchSpecific: true,
          create: true,
          delete: true,
          update: {
            pay: true,
            deliver: true,
          },
        },
        error: {
          fetchAll: null,
          fetchSpecific: null,
          create: null,
          delete: null,
          update: {
            pay: null,
            deliver: null,
          },
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

export default ordersReducer;
