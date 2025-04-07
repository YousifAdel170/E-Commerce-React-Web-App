import { useEffect, useMemo, useState } from "react";
import notify from "../Utility/useNotifyHook";
import { SUCCESS, WARNING } from "../../config";
import { addToCartAction } from "../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const AddToCartHook = (id, itemProduct) => {
  const dispatch = useDispatch();
  const [indexColorClicked, setIndexColorClicked] = useState("");
  const [colorClickedHex, setColorClickedHex] = useState("");
  const [loading, setLoading] = useState(true);

  const itemAvailableColors = useMemo(() => {
    if (itemProduct && itemProduct.availableColors)
      return itemProduct.availableColors;
    else return [];
  }, [itemProduct]);

  const colorClicked = (color, index) => {
    setIndexColorClicked(index);
    setColorClickedHex(color);
  };

  //   Function Responsible to add new item into the cart
  const handleAddToCart = async () => {
    if (itemProduct.quantity === 0) {
      notify("لا يوجد من هذا المنتج حاليا", WARNING);
      return;
    }

    // Check if there colors so need to be checked before making the request
    if (itemAvailableColors.length) {
      if (colorClickedHex === "") {
        notify("من فضلك اختر لون اولا للمنتج", WARNING);
        return;
      } else setColorClickedHex("");
    }

    setLoading(true);
    await dispatch(
      addToCartAction({
        productId: id,
        color: colorClickedHex,
      })
    );
    setLoading(false);
  };

  const result = useSelector((state) => state.cartReducer.addToCart);

  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت اضافة المنتج للعربه بنجاح", SUCCESS);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else notify("قم بتسجيل الدخول اولا", WARNING);
    }
  }, [loading, result]);

  return [colorClicked, indexColorClicked, handleAddToCart];
};

export default AddToCartHook;
