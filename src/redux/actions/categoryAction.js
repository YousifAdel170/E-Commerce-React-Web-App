import { CREATE_NEW_CATEGORY, GET_ALL_CATEGORY, GET_ERROR } from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";
import useGetData from "../../hooks/axios/useGetData";

// Get All Items From the Categories with Specified Limit [First Page]
export const getAllCategory = (limit) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/categories?limit=${limit}`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get All Items From the Categories with Specified Limit [Specified Page]
export const getAllCategoryInSelectedPage =
  (limit, page) => async (dispatch) => {
    try {
      const result = await useGetData(
        `/api/v1/categories?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_ALL_CATEGORY,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Add new Item To The API
export const createNewCategory = (formData) => async (dispatch) => {
  try {
    const result = await useInsertDataWithImage(`/api/v1/categories`, formData);
    dispatch({
      type: CREATE_NEW_CATEGORY,
      payload: result,
    });
    return Promise.resolve(result);
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
    Promise.reject(e);
  }
};
