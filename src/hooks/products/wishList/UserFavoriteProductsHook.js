import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";



import { FAVORITE_PRODUCTS_BASE_URL } from "../../../config";
import { PAGE_FAVORITE_PRODUCTS_LIMIT } from "../../../constants/pageLimits";
import { EMPTY, USER_ROLES } from "../../../constants/general";
import { getAllWishList } from "../../../redux/actions/wishListAction";

const UserFavoriteProductsHook = () => {
  const dispatch = useDispatch();

  const { viewAllWishList, loading } = useSelector(
    (state) => state.wishListReducer
  );
  const user = useSelector((state) => state.authReducer.user);

  /* -------------------- Fetch once -------------------- */

  useEffect(() => {
    if (!user || user.role === USER_ROLES.ADMIN) return;

    const getData = async () => await dispatch(getAllWishList(PAGE_FAVORITE_PRODUCTS_LIMIT));

    getData();
  }, [dispatch, user]);

  /* -------------------- Derived state -------------------- */

  const isLoading = loading.fetchAll;

  const items = useMemo(() => {
    if (!viewAllWishList?.data) return EMPTY.ARRAY;

    return viewAllWishList.data.map((product) => ({
      ...product,
      imageCover: FAVORITE_PRODUCTS_BASE_URL + product.imageCover,
      images: (product.images || []).map(
        (img) => FAVORITE_PRODUCTS_BASE_URL + img
      ),
    }));
  }, [viewAllWishList]);

  const pageCount = useMemo(() => {
    return viewAllWishList?.paginationResult?.numberOfPages || 0;
  }, [viewAllWishList]);

  const favoriteProductsIDs = useMemo(() => {
    return viewAllWishList?.data?.map((item) => item._id) || EMPTY.ARRAY;
  }, [viewAllWishList]);


  /* -------------------- Return -------------------- */

  return [
    items,
    isLoading,
    pageCount,
    favoriteProductsIDs,
  ];
};

export default UserFavoriteProductsHook;
