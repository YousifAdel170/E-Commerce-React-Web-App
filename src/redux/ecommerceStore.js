// Import necessary libraries and modules from Redux, Redux Thunk and Redux DevTools
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

// Import the root reducer which combines all the reducers
import rootReducer from "./reducers/rootReducer";

// Create the Redux store with the root reducer, applying middleware for asynchronous actions
export const ecommerceStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
