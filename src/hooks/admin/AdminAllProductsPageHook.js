// ================================
//  Import Hooks from react, redux
// ================================
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ================================
// Import Actions
// ================================
import { getAllProductsInSelectedPage } from "../../redux/actions/productsAction";

// ================================
// Import Constants
// ================================
import { PAGE_PRODUCTS_LIMIT } from "../../constants/pageLimits";
import { EMPTY } from "../../constants/general";

// ================================
// Admin All Products Page Hook
// ================================
const AdminAllProductsPageHook = () => {
  // Use Dispatch to call redux actions
  const dispatch = useDispatch();

  // Local State to hold the current list of items
  const [items, setItems] = useState(EMPTY.ARRAY);

  // Get products data from redux store
  const products = useSelector((state) => state.allProduct.viewProducts);

  // Set the redux products into local state when products change
  useEffect(() => {
    if (products) setItems(products.data);
    else setItems(EMPTY.ARRAY);
  }, [products]);

  // Memoized page count from pagination result
  const pageCount = useMemo(() => {
    if (products?.paginationResult)
      return products.paginationResult.numberOfPages;
    else return 0;
  }, [products]);

  // Function to get data for a selected page
  const onPress = async (page) =>
    await dispatch(getAllProductsInSelectedPage(PAGE_PRODUCTS_LIMIT, page));

  // Function to delete an item from the list
  const onDelete = (id) =>
    setItems((prev) => prev.filter((item) => item._id !== id));

  // Function to update an item in the list
  const onEdit = (updatedItem) =>
    setItems((prev) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );

  // Return values and handlers
  return [items, pageCount, onPress, onDelete, onEdit];
};

export default AdminAllProductsPageHook;
