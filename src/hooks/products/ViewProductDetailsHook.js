import { useDispatch, useSelector } from "react-redux";
import {
  getProductsLikeThis,
  getSpecificProduct,
} from "../../redux/actions/productsAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { useEffect, useMemo } from "react";

import mobile from "../../Assets/Imgs/mobile.png";
import { getSpecificCategory } from "../../redux/actions/categoryAction";
import { getSpecificBrand } from "../../redux/actions/brandAction";

const ViewProductDetailsHook = (productID) => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch Products only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getSpecificProduct(productID));
  }, [dispatch, productID]);

  //   Select data from redux after being dispatched
  const products = useSelector((state) => state.allProduct.viewSpecificProduct);
  const category = useSelector((state) => state.allCategory.viewProductsLike);
  const brand = useSelector((state) => state.allBrand.viewSpecificBrand);
  const productsLike = useSelector(
    (state) => state.allProduct.viewProductsLike
  );

  //   To save the details [Text] into array
  const itemProduct = useMemo(() => {
    if (products && products.data) return products.data;
    return [];
  }, [products]);

  //   Dispatch the category after getting the product [get the category of the product]
  useEffect(() => {
    // Dispatch The Category of the product && Dispatch Products like this product
    if (itemProduct && itemProduct.category) {
      dispatch(getSpecificCategory(itemProduct.category));
      dispatch(getProductsLikeThis(itemProduct.category));
    }

    // Dispatch the brand of the product
    if (itemProduct && itemProduct.brand)
      dispatch(getSpecificBrand(itemProduct.brand));
  }, [dispatch, itemProduct]);

  //   To save the details [images] into array
  const images = useMemo(() => {
    if (itemProduct && itemProduct.images) {
      return itemProduct.images.map((image) => {
        return { original: image };
      });
    } else return [{ original: `${mobile}` }];
  }, [itemProduct]);

  //   To Show The Catogory Item
  const itemCategory = useMemo(() => {
    if (category && category.data) return category.data;
    else return [];
  }, [category]);

  //   To Show The Catogory Item
  const itemBrand = useMemo(() => {
    if (brand && brand.data) return brand.data;
    else return [];
  }, [brand]);

  //   To Show The Products that has same product's category
  const prodouctsLikeSample = useMemo(() => {
    if (productsLike && productsLike.data)
      return productsLike.data.length > 4
        ? productsLike.data.slice(0, 4)
        : productsLike.data;
    else return [];
  }, [productsLike]);

  return [itemProduct, images, itemCategory, itemBrand, prodouctsLikeSample];
};

export default ViewProductDetailsHook;
