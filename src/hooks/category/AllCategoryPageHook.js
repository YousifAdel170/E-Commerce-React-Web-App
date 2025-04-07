import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllCategoryInSelectedPage,
} from "../../redux/actions/categoryAction";

const AllCategoryPageHook = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Categories) using useSelector
  const result = useSelector((state) => state.allCategory);

  // 2. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCategory(7));
    };

    getData();
  }, [dispatch]);

  const pageCount = useMemo(() => {
    if (result && result.category && result.category.paginationResult)
      return result.category.paginationResult.numberOfPages;
    else return 0;
  }, [result]);

  const categories = useMemo(() => {
    if (result && result.category && result.category.data)
      return result.category.data;
    else return [];
  }, [result]);

  const loading = useMemo(() => {
    if (result && result.loading) return result.loading;
    else return false;
  }, [result]);

  // 5. Fetch the Data from the Api That in the Selected Page
  const getSelectedPageNumber = async (selectedPage) => {
    await dispatch(getAllCategoryInSelectedPage(7, selectedPage));
  };

  // 6. Return the Data To The JSX code
  return [categories, loading, pageCount, getSelectedPageNumber];
};

export default AllCategoryPageHook;
