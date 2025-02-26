import baseUrl from "../../Api/baseURL";

const useGetData = async (url, params) => {
  const result = await baseUrl.get(url, params);
  return result.data;
};

const useGetDataToken = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const result = await baseUrl.get(url, config);
  return result.data;
};

export { useGetData, useGetDataToken };
