import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../redux/actions/brandAction";

const HomeBrandHook = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Brand) using useSelector
  const result = useSelector((state) => state.allBrand);

  // 2. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    dispatch(getAllBrand(5));
  }, [dispatch]);

  // 3. colors to be choosed randomly as background into the item
  const colors = [
    "#ffd3e8",
    "#f4dba5",
    "#55cfdf",
    "#ff6262",
    "#0034ff",
    "#ffd3e8",
  ];

  // 4. Return the Data To The JSX code
  return [result, colors];
};

export default HomeBrandHook;
