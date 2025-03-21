import { GET_ALL_ORDERS, GET_SPECIFIC_ORDER } from "../type";

const initialState = {
  viewAllOrders: [],
  specificOrder: [],
  loading: true,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ...state, viewAllOrders: action.payload, loading: false };

    case GET_SPECIFIC_ORDER:
      return { ...state, specificOrder: action.payload, loading: false };

    default:
      return state;
  }
};

export default ordersReducer;
