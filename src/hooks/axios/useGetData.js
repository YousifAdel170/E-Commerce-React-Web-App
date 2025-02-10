import baseUrl from "../../Api/baseURL";

const useGetData = async (url, params) => {
  const result = await baseUrl.get(url, params);
  return result.data;
};

export default useGetData;
