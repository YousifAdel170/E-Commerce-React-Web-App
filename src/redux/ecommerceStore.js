import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/rootReducer";
import { thunk } from "redux-thunk";

export const ecommerceStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
