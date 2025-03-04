import {
  CREATE_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_SPECIFIC_PRODUCT,
  GET_PODUCTS_LIKE,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ERROR,
} from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";
import { useGetData } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/axios/useUpdateData";

// Add new Item To The API [Create New Product]
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
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error  " + e,
    });
  }
};

// Get All Items From the Products with Specified Limit [First Page]
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/products?limit=${limit}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
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
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
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
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
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
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
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
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Delete Specific Product By its ID
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const result = await useDeleteData(`/api/v1/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: result,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
