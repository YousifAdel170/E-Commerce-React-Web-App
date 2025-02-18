import {
  CREATE_NEW_SUB_CATEGORY,
  GET_ALL_SUB_CATEGORY,
  GET_ERROR,
} from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";
import useGetData from "../../hooks/axios/useGetData";

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

// Add Get All sub categories based on The Category ID To The API
export const getAllSubCategory = (categoryID) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/categories/${categoryID}/subcategories`
    );

    console.log(response);
    dispatch({
      type: GET_ALL_SUB_CATEGORY,
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
