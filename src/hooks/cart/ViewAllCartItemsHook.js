/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../redux/actions/cartAction";

const ViewAllCartItemsHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [couponName, setCouponName] = useState("");
  const [totalCartPriceAfterDisc, setTotalCartPriceAfterDisc] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getAllCartItems());
      setLoading(false);
    };

    getData();
  }, [dispatch]);

  const result = useSelector((state) => state.cartReducer.allCartItems);

  useEffect(() => {
    if (!loading) {
      if (result && result.status === "success") {
        setNumberOfItems(result.numOfCartItems);
        setCartItems(result.data.products);
        setTotalCartPrice(result.data.totalCartPrice);

        if (result.data.coupon) setCouponName(result.data.coupon);
        else setCouponName("");

        if (result.data.totalAfterDiscount)
          setTotalCartPriceAfterDisc(result.data.totalAfterDiscount);
        else setTotalCartPriceAfterDisc("");
      } else {
        setCouponName("");
        setTotalCartPriceAfterDisc("");
        setNumberOfItems(0);
        setCartItems([]);
        setTotalCartPrice(0);
      }
    }
  }, [loading]);

  return [
    numberOfItems,
    cartItems,
    totalCartPrice,
    couponName,
    totalCartPriceAfterDisc,
  ];
};

export default ViewAllCartItemsHook;
