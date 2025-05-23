import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsInSelectedPage } from "../../redux/actions/productsAction";
import { PAGE_PRODUCTS_LIMIT } from "../../constants/pageLimits";

const AdminAllProductsPageHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const products = useSelector((state) => state.allProduct.viewProducts);

  // Useeffect to set the products into the items state
  useEffect(() => {
    if (products) setItems(products.data);
    else setItems([]);
  }, [products]);

  //   To Get The Page number for pagination
  const pageCount = useMemo(() => {
    if (products && products.paginationResult)
      return products.paginationResult.numberOfPages;
    else return 0;
  }, [products]);

  const onPress = async (page) =>
    await dispatch(getAllProductsInSelectedPage(PAGE_PRODUCTS_LIMIT, page));

  const onDelete = (id) =>
    setItems((prev) => prev.filter((item) => item._id !== id));

  const onEdit = (updatedItem) =>
    setItems((prev) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  return [items, pageCount, onPress, onDelete, onEdit];
};

export default AdminAllProductsPageHook;
