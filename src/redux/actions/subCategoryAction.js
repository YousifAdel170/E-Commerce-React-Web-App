import { CREATE_NEW_SUB_CATEGORY, GET_ERROR } from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";

// Add new sub category To The API
export const createNewSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/subcategories", data);
    dispatch({
      type: CREATE_NEW_SUB_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
