import {
  CREATE_NEW_SUB_CATEGORY,
  GET_ALL_SUB_CATEGORY,
  DELETED_SUB_CATEGORY,
  UPDATED_SUB_CATEGORY,
  GET_SPECIFIC_SUB_CATEGORY,
  GET_ERROR,
  RESET_STATE,
} from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";
import { useGetData } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";

// Add Get All sub categories based on The Category ID To The API
export const getAllSubCategory =
  (categoryID, limit, page) => async (dispatch) => {
    try {
      let query = "?";

      if (limit) query += `limit=${limit}&`;
      if (page) query += `page=${page}&`;

      query = query === "?" ? "" : query.slice(0, -1);

      const response = await useGetData(
        `/api/v1/categories/${categoryID}/subcategories${query}`
      );

      dispatch({
        type: GET_ALL_SUB_CATEGORY,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: e,
        meta: "fetchAll",
      });
    }
  };

// Get The Sub category by its ID
export const getSpecificSubCategory = (id) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/subcategories/${id}`);
    dispatch({
      type: GET_SPECIFIC_SUB_CATEGORY,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e,
      meta: "fetchSpecific",
    });
  }
};

// Add new sub category To The API
export const createNewSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/subcategories", data);
    dispatch({
      type: CREATE_NEW_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e,
      meta: "create",
    });
  }
};

// Action To Delete Specific Subcategory USing Its ID
export const deleteSubcategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`api/v1/subcategories/${id}`);
    dispatch({
      type: DELETED_SUB_CATEGORY,
      payload: { response, id },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
      meta: "delete",
    });
  }
};

// Action To Update Specific Category USing Its ID
export const editSubcategory = (id, formatData) => async (dispatch) => {
  try {
    const response = await useUpdateData(
      `/api/v1/subcategories/${id}`,
      formatData
    );
    dispatch({
      type: UPDATED_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
      meta: "update",
    });
  }
};

// Action To Reset State After Specific Action
export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};
