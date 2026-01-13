import {
  CREATE_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_SPECIFIC_PRODUCT,
  GET_PODUCTS_LIKE,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS_BY_CATEGORY,
  GET_ALL_PRODUCTS_BY_BRAND,
  GET_ERROR,
  RESET_STATE,
} from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";
import { useGetData } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/axios/useUpdateData";

// Get All Items From the Products with Specified Limit [First Page]
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const query = limit ? `?limit=${limit}` : "";
    const result = await useGetData(`/api/v1/products${query}`);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchAll",
    });
  }
};

// Get All Items From the Products with Specified Category
export const getAllProductsByCategory =
  (limit, page, categoryID) => async (dispatch) => {
    try {
      const result = await useGetData(
        `/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_BY_CATEGORY,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: e.response?.data?.message || e.message || "Unknown error",
        meta: "fetchAll",
      });
    }
  };

// Get All Items From the Products with Specified Brand
export const getAllProductsByBrand =
  (limit, page, brandID) => async (dispatch) => {
    try {
      const result = await useGetData(
        `/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_BY_BRAND,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: e.response?.data?.message || e.message || "Unknown error",
        meta: "fetchAll",
      });
    }
  };

// Get All Items From the Products with Specified Limit [Specified Page]
export const getAllProductsInSelectedPage =
  (limit, page) => async (dispatch) => {
    try {
      const result = await useGetData(
        `/api/v1/products?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: e.response?.data?.message || e.message || "Unknown error",
        meta: "fetchAll",
      });
    }
  };

// Get All Products With Query String
export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/products?${queryString}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchAll",
    });
  }
};

// Get Data For the Spcific Product By its ID
export const getSpecificProduct = (id) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/products/${id}`);
    dispatch({
      type: GET_SPECIFIC_PRODUCT,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
    });
  }
};

// Get Other Products that look like this product [ID]
export const getProductsLikeThis = (id) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/products?category=${id}`);
    dispatch({
      type: GET_PODUCTS_LIKE,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchAll",
    });
  }
};

// Add new Item To The API [Create New Product]
export const createNewProduct = (formatData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      "/api/v1/products",
      formatData
    );
    console.log("createNewProduct response:", response);
    dispatch({
      type: CREATE_NEW_PRODUCT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "create",
    });
  }
};

// Update The Item To The API based on its ID
export const updateProduct = (id, formatData) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/products/${id}`,
      formatData
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "update",
    });
  }
};

// Delete Specific Product By its ID
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: { response, id },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "delete",
    });
  }
};

// Action To Reset State After Specific Action
export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};
