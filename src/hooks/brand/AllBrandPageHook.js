import { useEffect } from "react";
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

  // 3. Intialize The page counter to zero
  let pageCount = 0;

  // 4. Update Page Counter: Check if there pages then update the page counter
  if (result.brand.paginationResult)
    pageCount = result.brand.paginationResult.numberOfPages;

  // 5. Fetch the Data from the Api That in the Selected Page
  const getSelectedPageNumber = (selectedPage) => {
    // console.log(selectedPage);
    dispatch(getAllBrandInSelectedPage(2, selectedPage));
  };

  // 6. Return the Data To The JSX code
  return [result, pageCount, getSelectedPageNumber];
};

export default AllBrandPageHook;
