import baseUrl from "../../Api/baseURL";

const useDeleteData = async (url, params) => {
  const result = await baseUrl.delete(url, params);
  return result.data;
};

export default useDeleteData;
