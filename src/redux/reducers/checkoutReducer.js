import { CREATE_ORDER_CASH } from "../type";

const initialState = {
  createOrderCash: [],
  loading: true,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_CASH:
      return { ...state, createOrderCash: action.payload, loading: false };

    default:
      return state;
  }
};

export default checkoutReducer;
