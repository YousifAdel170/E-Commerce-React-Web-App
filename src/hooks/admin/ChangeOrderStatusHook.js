import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";
import {
  changeOrderDeliverAction,
  changeOrderPayAction,
} from "../../redux/actions/ordersAction";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatusHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingPay, setLoadingPay] = useState(true);
  const [pay, setPay] = useState("0");

  const [loadingDeliver, setLoadingDeliver] = useState(true);
  const [deliver, setDeliver] = useState("0");

  const onChangePay = (e) => setPay(e.target.value);
  const onChangeDeliver = (e) => setDeliver(e.target.value);

  const changePayOrderStatus = async () => {
    if (pay === "0") {
      notify("من فضلك اختر اذا تم البيع ام لا", WARNING);
      return;
    } else if (pay === "true") {
      setLoadingPay(true);
      await dispatch(changeOrderPayAction(id));
      setLoadingPay(false);
    }
  };

  const changeDeliverOrderStatus = async () => {
    if (deliver === "0") {
      notify("من فضلك اختر اذا تم التوصيل ام لا", WARNING);
      return;
    } else if (deliver === "true") {
      setLoadingDeliver(true);
      await dispatch(changeOrderDeliverAction(id));
      setLoadingDeliver(false);
    }
  };

  const resultPay = useSelector(
    (state) => state.ordersReducer.updatedOrderPayStatus
  );
  const resultDeliver = useSelector(
    (state) => state.ordersReducer.updatedOrderDeliverStatus
  );

  useEffect(() => {
    if (!loadingPay) {
      if (resultPay && resultPay.status === 200) {
        notify("تم تغير حالة الدفع بنجاح", SUCCESS);
        navigate("/admin/all-orders");
      } else notify("هناك مشكله فى عملية التغير", ERROR);
    }
  }, [loadingPay]);

  useEffect(() => {
    if (!loadingDeliver) {
      if (resultDeliver && resultDeliver.status === 200) {
        notify("تم تغير حالة التوصيل بنجاح", SUCCESS);
        navigate("/admin/all-orders");
      } else notify("هناك مشكله فى عملية التغير", ERROR);
    }
  }, [loadingDeliver]);

  return [
    onChangePay,
    onChangeDeliver,
    changePayOrderStatus,
    changeDeliverOrderStatus,
  ];
};

export default ChangeOrderStatusHook;
