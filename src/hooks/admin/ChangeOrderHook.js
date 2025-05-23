// Import Hooks from React, React Redux, and React Router Dom
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions
import {
  changeOrderDeliverAction,
  changeOrderPayAction,
} from "../../redux/actions/ordersAction";

// Import Constants for Admin Order Details
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";

// Import Constant Data
import { adminOrderDetailsData } from "../../data/admin/adminOrderDetails";

// Hook Responsible for managing the change order status functionality
const ChangeOrderHook = (id, orderDetails) => {
  // Initialize Redux dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   Initialize loading states and order status states
  const [loadingPay, setLoadingPay] = useState(true);
  const [pay, setPay] = useState("0");
  const [loadingDeliver, setLoadingDeliver] = useState(true);
  const [deliver, setDeliver] = useState("0");

  // Useeffect to get the status of the payment, deliver of the order
  useEffect(() => {
    if (orderDetails) {
      setPay(orderDetails.isPaid ? "true" : "0");
      setDeliver(orderDetails.isDelivered ? "true" : "0");
    }
  }, [orderDetails]);

  //   Function to handle changes in payment status, and delivery status
  const onChangePay = (e) => setPay(e.target.value);
  const onChangeDeliver = (e) => setDeliver(e.target.value);

  // Function to handle the change of order status
  const changeOrderStatus = async () => {
    // Check if the user has selected a payment and delivery status
    if (pay === "0") {
      notify("من فضلك اختر اذا تم البيع ام لا", WARNING);
      return;
    }

    // Check if the user has selected a delivery status
    else if (deliver === "0") {
      notify("من فضلك اختر اذا تم التوصيل ام لا", WARNING);
      return;
    }

    // Check if the user has selected both payment and delivery status
    else {
      // If both payment and delivery status are selected, update the order status
      if (
        pay === "true" &&
        deliver === "true" &&
        !orderDetails?.isPaid &&
        !orderDetails?.isDelivered
      ) {
        setLoadingPay(true);
        setLoadingDeliver(true);
        await dispatch(changeOrderPayAction(id));
        await dispatch(changeOrderDeliverAction(id));
        setLoadingPay(false);
        setLoadingDeliver(false);
      }

      //   If only payment status is selected, update the payment status
      else if (pay === "true" && !orderDetails?.isPaid) {
        setLoadingPay(true);
        await dispatch(changeOrderPayAction(id));
        setLoadingPay(false);
      }

      //   If only delivery status is selected, update the delivery status
      else if (deliver === "true" && !orderDetails?.isDelivered) {
        setLoadingDeliver(true);
        await dispatch(changeOrderDeliverAction(id));
        setLoadingDeliver(false);
      }

      //   If the user tries to change the status to false, show a warning
      else if (pay === "false" && deliver === "false") {
        notify("لا يمكن ان تكون حالة الدفع و التوصيل لا", WARNING);
        return;
      }

      //   If the user tries to change the status to false, show a warning
      else if (deliver === "false" && orderDetails?.isPaid) {
        notify("حالة التوصيل بالفعل لم تتم", WARNING);
        return;
      }

      //   If the user tries to change the status to false, show a warning
      else if (pay === "false" && orderDetails?.isDelivered) {
        notify("حالة الدفع بالفعل لم تتم", WARNING);
        return;
      }
    }
  };

  //   Use useSelector to get the updated order payment and delivery status
  const resultPay = useSelector(
    (state) => state.ordersReducer.updatedOrderPayStatus
  );
  const resultDeliver = useSelector(
    (state) => state.ordersReducer.updatedOrderDeliverStatus
  );

  //   Use useEffect to check if the payment and delivery status has been updated
  useEffect(() => {
    // Check if the payment and delivery status is loading
    if (!loadingPay || !loadingDeliver) {
      // Check if the payment status is updated
      if (resultPay?.status === 200 && resultDeliver?.status === 200) {
        notify("تم تغير حالة الدفع و التوصيل بنجاح", SUCCESS);
        setTimeout(() => navigate("/admin/all-orders"), 1000);
      }

      //   Check if the payment status is updated
      else if (resultPay?.status === 200) {
        notify("تم تغير حالة الدفع بنجاح", SUCCESS);
        setTimeout(() => navigate("/admin/all-orders"), 1000);
      }

      //   Check if the delivery status is updated
      else if (resultDeliver?.status === 200) {
        notify("تم تغير حالة التوصيل بنجاح", SUCCESS);
        setTimeout(() => navigate("/admin/all-orders"), 1000);
      }

      //   If the payment and delivery status is not updated, show an error message
      else notify("هناك مشكله فى عملية التغير", ERROR);
    }
  }, [loadingPay, loadingDeliver, resultPay, resultDeliver, navigate]);

  const orderStatus = adminOrderDetailsData.orderStatus;

  // Extracting user information fields from the order details
  const userInfoFields = [
    {
      label: adminOrderDetailsData?.user?.name,
      value: orderDetails?.user?.name || "",
    },
    {
      label: adminOrderDetailsData?.user?.email,
      value: orderDetails?.user?.email || "",
    },
    {
      label: adminOrderDetailsData?.user?.phone,
      value: orderDetails?.user?.phone || "",
    },
  ];

  const statusItems = [
    {
      key: "payment",
      onChange: onChangePay,
      disabled: orderDetails?.isPaid,
    },
    {
      key: "delivery",
      onChange: onChangeDeliver,
      disabled: orderDetails?.isDelivered,
    },
  ];

  //   Return the loading states and functions to handle changes in payment and delivery status
  return [orderStatus, userInfoFields, statusItems, changeOrderStatus];
};

// Export the ChangeOrderHook function as default
export default ChangeOrderHook;
