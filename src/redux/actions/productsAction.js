import { CREATE_NEW_PRODUCT, GET_ERROR } from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";

// Add new Item To The API
//create products with pagination
export const createNewProduct = (formatData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      "/api/v1/products",
      formatData
    );
    dispatch({
      type: CREATE_NEW_PRODUCT,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error  " + e,
    });
  }
};
