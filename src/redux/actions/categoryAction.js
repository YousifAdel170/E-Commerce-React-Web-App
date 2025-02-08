import { GET_ALL_CATEGORY, GET_ERROR } from "../type";

import useGetData from "../../hooks/useGetData";

const getAllCategory = () => async (dispatch) => {
  try {
    const result = await useGetData("/api/v1/categories");
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: result.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export default getAllCategory;
