// Import Components From react-bootstrap, react-toastify
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Hooks From react
import { useState } from "react";

// Import Custom Hooks
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import OrderPayCashHook from "../../hooks/checkout/OrderPayCashHook";
import OrderPayCardHook from "../../hooks/checkout/OrderPayCardHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";
import notify from "../../hooks/Utility/useNotifyHook";

// Import constants
import { WARNING } from "../../config";

// ChoosePayMethod component to handle payment method selection
const ChoosePayMethod = () => {
  // Hook to get all user addresses
  const [addresses] = UserAllAddressesHook();

  // Hook to get cart details like total price
  const [, , , totalCartPrice, , totalCartPriceAfterDisc, ,] =
    ViewAllCartItemsHook();

  // Hook to manage cash order creation
  const [handleChooseAddress, handleCreateOrderCash, addressDetails] =
    OrderPayCashHook();

  // Hook to manage card order creation
  const [handleCreateOrderCart] = OrderPayCardHook(addressDetails);

  // Local state to handle selected payment method (card or cash)
  const [type, setType] = useState("");

  // Function to change the payment method based on user selection
  const changePayMethod = (e) => setType(e.target.value);

  // Function to handle payment process
  const handlePay = () => {
    if (type === "card") handleCreateOrderCart(); // Process card payment
    else if (type === "cash") handleCreateOrderCash(); // Process cash payment
    else notify("من فضلك اختر طريقة دفع", WARNING); // Notify if no payment method is selected
  };

  return (
    <div>
      {/* Payment Method Selection Title */}
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>

      {/* Address and Payment Method Selection */}
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between">
          {/* Payment with Visa (Card) */}
          <Col xs="12" className="mt-4">
            <input
              name="group"
              onChange={changePayMethod} // Set payment type to 'card' on selection
              style={{ cursor: "pointer" }}
              id="group1"
              type="radio"
              value="card"
              className="mt-2"
            />
            <label
              className="mx-2"
              htmlFor="group1"
              style={{ cursor: "pointer" }}
            >
              الدفع عن طريق البطاقه الائتمانية
            </label>
          </Col>
        </Row>

        {/* Pay When Order Recieve (Cash) */}
        <Row className="">
          <Col xs="12" className="d-flex mt-4">
            <input
              name="group"
              onChange={changePayMethod} // Set payment type to 'cash' on selection
              style={{ cursor: "pointer" }}
              id="group2"
              type="radio"
              value="cash"
              className="mt-2"
            />
            <label
              className="mx-2"
              htmlFor="group2"
              style={{ cursor: "pointer" }}
            >
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>

        {/* Address Selection Dropdown */}
        <Row className="">
          <Col xs="12" className="d-flex my-4">
            <select
              name="address"
              id="address"
              className="select px-2"
              onChange={handleChooseAddress} // Set selected address for delivery
            >
              <option value="0">اختر عنوان للشحن</option>
              {addresses ? (
                // Map over addresses if they exist
                addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.alias}
                  </option>
                ))
              ) : (
                <option key={0} value={0}>
                  لا يوجد عنوانين مسجلة
                </option>
              )}
            </select>
          </Col>
        </Row>
      </div>

      {/* Display Total Price and Checkout Button */}
      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-flex justify-content-center align-items-center  border">
            {/* Show price before and after discount */}
            {totalCartPriceAfterDisc ? (
              <>
                <div>
                  قبل الخصم : <del className="ms-3">{totalCartPrice}</del>
                </div>
                <div>
                  بعد الخصم: <>{totalCartPriceAfterDisc}</>
                </div>
              </>
            ) : (
              `${totalCartPrice} جنية`
            )}
          </div>
          {/* Trigger payment process when checkout button is clicked */}
          <div
            onClick={handlePay} // Call handlePay function on click
            className="product-cart-add px-3 d-flex justify-content-center align-items-center me-2"
          >
            اتمام الشراء
          </div>
        </Col>
      </Row>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default ChoosePayMethod;
