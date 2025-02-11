import { CREATE_NEW_BRAND, GET_ALL_BRAND, GET_ERROR } from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";
import useGetData from "../../hooks/axios/useGetData";

// Get All Items From the Brands with Specified Limit [First Page]
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/brands?limit=${limit}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get All Items From the Brands with Specified Limit [Specified Page]
export const getAllBrandInSelectedPage = (limit, page) => async (dispatch) => {
  try {
    const result = await useGetData(
      `/api/v1/brands?limit=${limit}&page=${page}`
    );
    dispatch({
      type: GET_ALL_BRAND,
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
export const createNewBrand = (formData) => async (dispatch) => {
  try {
    const result = await useInsertDataWithImage(`/api/v1/brands`, formData);
    dispatch({
      type: CREATE_NEW_BRAND,
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
