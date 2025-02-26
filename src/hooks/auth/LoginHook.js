import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EMAIL_TYPE,
  ERROR,
  LOGIN_WRONG,
  PASSWORD_TYPE,
  SUCCESS,
} from "../../config";
import notify from "../Utility/useNotifyHook";
import { loginUser } from "../../redux/actions/authAction";

const LoginHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  //   Function To handle the change of the input
  const onChangeInput = (e, type) => {
    switch (type) {
      case EMAIL_TYPE:
        setEmail(e.target.value);
        break;
      case PASSWORD_TYPE:
        setPassword(e.target.value);
        break;
      default:
    }
  };

  //   Function To Validate Inputs Before Submit
  const validateInputs = () => {
    // Validate Email Address
    if (email === "") {
      notify("من فضلك ادخل  البريد الالكتروني", ERROR);
      return;
    } else {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        notify("من فضلك ادخل  البريد الالكتروني صحيح", "error");
        return;
      }
    }
    // Validate Password
    if (password === "") {
      notify("من فضلك ادخل  كلمة مرور", ERROR);
      return;
    } else {
      if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        notify("من فضلك ادخل  كلمة مرور قوية", ERROR);
        return;
      }
    }
  };

  //   Function To Submit the Data [Login]
  const handleSubmit = async () => {
    // Validate Inputs Before Submit
    validateInputs();

    // Start The Login [Loading ON] &  Dispatch the action To Login User
    setIsPress(true);
    setLoading(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
    setLoading(false);
    setIsPress(false);
    // End The Login [Loading OFF]
  };

  const result = useSelector((state) => state.authReducer.loginUser);

  useEffect(() => {
    // Check if the Registeration End
    if (!loading) {
      if (result) {
        console.log(result);

        // Set The Token In the Local Storage [To Get The User Data]
        if (result.data && result.data.token) {
          // Set The Token when the user has been registered
          localStorage.setItem("token", result.data.token);

          // Set The User Data into the Local Storage when the user has been Logged in
          localStorage.setItem("user", JSON.stringify(result.data.data));

          // Notification For Success
          notify("تم تسجيل الحساب بنجاح", SUCCESS);

          // Navigate to Login Page
          setTimeout(() => (window.location.href = "/"), 1500);
        } else {
          // Remove the User From the Local Storage [require login again]
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        // Check If the user Entered Wrong Data
        if (result.data && result.data.message === LOGIN_WRONG) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify("كلمة السر او الايميل خطا", ERROR);
        }

        // Reset The Loading
        setLoading(true);
      }
    }
  }, [loading, result]);

  return [email, password, loading, isPress, onChangeInput, handleSubmit];
};

export default LoginHook;
