import baseUrl from "../../Api/baseURL";

const useInsertDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const result = await baseUrl.post(url, params, config);

  console.log(result);

  return result;
};

const useInsertData = async (url, params) => {
  const result = await baseUrl.post(url, params);
  return result.data;
};

export { useInsertData, useInsertDataWithImage };
