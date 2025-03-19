import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrand,
  getAllBrandInSelectedPage,
} from "../../redux/actions/brandAction";

const AllBrandPageHook = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Brands) using useSelector
  const result = useSelector((state) => state.allBrand);

  // 2. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    dispatch(getAllBrand(2));
  }, [dispatch]);

  const pageCount = useMemo(() => {
    if (result && result.brand && result.brand.paginationResult)
      return result.brand.paginationResult.numberOfPages;
    else return 0;
  }, [result]);

  // 5. Fetch the Data from the Api That in the Selected Page
  const getSelectedPageNumber = (selectedPage) => {
    dispatch(getAllBrandInSelectedPage(2, selectedPage));
  };

  const brands = useMemo(() => {
    if (result && result.brand && result.brand.data) return result.brand.data;
    else return [];
  }, [result]);

  const loading = useMemo(() => {
    if (result && result.loading) return result.loading;
    else return false;
  }, [result]);

  // 6. Return the Data To The JSX code
  return [brands, loading, pageCount, getSelectedPageNumber];
};

export default AllBrandPageHook;
