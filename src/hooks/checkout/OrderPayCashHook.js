import { useEffect, useState } from "react";
import { getSpecificUserAddress } from "../../redux/actions/userAddressAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewAllCartItemsHook from "../cart/ViewAllCartItemsHook";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";
import { createOrdrerCash } from "../../redux/actions/checkoutAction";

const OrderPayCashHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, , , , , cartID] = ViewAllCartItemsHook();

  const [loadingAddressDetails, setLoadingAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState(false);

  const [loadingCreate, setLoadingCreate] = useState(true);

  const handleChooseAddress = (e) => {
    setAddressDetails([]);
    if (e.target.value !== "0") getCurrentUserAddressData(e.target.value);
  };

  const getCurrentUserAddressData = async (id) => {
    setLoadingAddressDetails(true);
    await dispatch(getSpecificUserAddress(id));
    setLoadingAddressDetails(false);
  };

  const resultAddressDetails = useSelector(
    (state) => state.userAddressReducer.specificUserAddress
  );

  useEffect(() => {
    if (!loadingAddressDetails) {
      if (resultAddressDetails && resultAddressDetails.status === "success")
        setAddressDetails(resultAddressDetails.data);
      else setAddressDetails([]);
    }
  }, [loadingAddressDetails, resultAddressDetails]);

  const handleCreateOrderCash = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", WARNING);
      return;
    }

    if (addressDetails.length <= 0) {
      notify("من فضلك اختر عنوان اولا", WARNING);
      return;
    }

    setLoadingCreate(true);
    await dispatch(
      createOrdrerCash(cartID, {
        shippingAddress: {
          details: addressDetails.alias,
          phone: addressDetails.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setLoadingCreate(false);
  };

  const resultOrderCash = useSelector(
    (state) => state.checkoutReducer.createOrderCash
  );

  useEffect(() => {
    if (!loadingCreate) {
      if (resultOrderCash && resultOrderCash.status === 201) {
        notify("تم انشاء طلبك بنجاح", SUCCESS);
        setTimeout(() => navigate("/user/all-orders"), 1000);
      } else notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", ERROR);
    }
  }, [loadingCreate, resultOrderCash, navigate]);

  return [handleChooseAddress, handleCreateOrderCash, addressDetails];
};

export default OrderPayCashHook;
