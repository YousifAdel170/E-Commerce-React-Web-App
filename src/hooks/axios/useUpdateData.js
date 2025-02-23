import baseUrl from "../../Api/baseURL";

const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const result = await baseUrl.put(url, params, config);

  return result;
};

const useUpdateData = async (url, params) => {
  const result = await baseUrl.put(url, params);
  return result;
};

export { useUpdateData, useUpdateDataWithImage };
