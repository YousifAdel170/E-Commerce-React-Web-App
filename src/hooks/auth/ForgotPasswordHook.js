import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";
import { forgotPassword } from "../../redux/actions/authAction";

const ForgotPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    // Check If Email is Empty
    if (email === "") {
      notify("من فضلك ادخل الايميل", ERROR);
      return;
    }

    // Set User Email into Local Storage
    localStorage.setItem("user-email", email);

    // Start The Login [Loading ON] &  Dispatch the action Of Forgot The Password
    setLoading(true);
    await dispatch(
      forgotPassword({
        email,
      })
    );
    setLoading(false);
    // End The action Of Forgot The Password [Loading OFF]
  };

  // Get The Response After The Action Has Been Done
  const response = useSelector((state) => state.authReducer.forgotPassword);

  useEffect(() => {
    // Check if the Forget Password Operation End
    if (!loading) {
      if (response) {
        console.log(response);

        // // Check if The Response is Successfull
        if (response.data && response.data.status === "Success") {
          notify("تم ارسال الكود للايميل بنجاح", SUCCESS);
          setTimeout(() => navigate("/user/verify-code"), 1000);
        }
        // Check if The Response Fail
        if (response.data && response.data.status === "fail")
          notify("هذا الحساب غير موجود لدينا", ERROR);
      }
    }
  }, [loading, navigate, response]);

  return [onChangeEmail, email, handleSubmit];
};

export default ForgotPasswordHook;
