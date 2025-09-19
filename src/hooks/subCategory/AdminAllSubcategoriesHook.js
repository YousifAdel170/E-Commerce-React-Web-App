import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubCategory } from "../../redux/actions/subCategoryAction";

const AdminAllSubcategoriesHook = (id) => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Categories) using useSelector
  const result = useSelector((state) => state.allSubCategory.subCategory);

  // 2. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    const getData = async () => await dispatch(getAllSubCategory(id, 7));

    getData();
  }, [dispatch, id]);

  const pageCount = useMemo(() => {
    return result?.paginationResult?.numberOfPages || 0;
  }, [result]);

  const subcategories = useMemo(() => {
    return result?.data || [];
  }, [result]);

  const numberOfSubcategories = useMemo(() => {
    return result?.results || 0;
  }, [result]);

  // 5. Fetch the Data from the Api That in the Selected Page
  const getSelectedPageNumber = async (selectedPage) =>
    await dispatch(getAllSubCategory(id, 7, selectedPage));

  // 6. Return the Data To The JSX code
  return [
    subcategories,
    pageCount,
    getSelectedPageNumber,
    numberOfSubcategories,
  ];
};

export default AdminAllSubcategoriesHook;
