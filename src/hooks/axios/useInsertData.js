import baseUrl from "../../Api/baseURL";

const useInsertDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const result = await baseUrl.post(url, params, config);

  return result;
};

const useInsertData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const result = await baseUrl.post(url, params, config);
  return result;
};

export { useInsertData, useInsertDataWithImage };
