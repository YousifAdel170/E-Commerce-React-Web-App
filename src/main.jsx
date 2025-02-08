import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux"; // To connect Redux
import { ecommerceStore } from "./redux/ecommerceStore.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={ecommerceStore}>
    <App />
  </Provider>
);
