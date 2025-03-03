import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";
import { resetPassword } from "../../redux/actions/authAction";

const ResetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setComfirmPassword(e.target.value);

  const handleSubmit = async () => {
    // Check if the Password is empty
    if (password === "") {
      notify("من فضلك ادخل كلمة السر", ERROR);
      return;
    }

    // Check if the Password Not The Same with The Confirm Password
    if (password != confirmPassword) {
      notify("كلمة السر غير متطابقه مع تاكيد كلمع السر", ERROR);
      return;
    }

    // Start The Reset The Password [Loading ON]
    setLoading(true);
    await dispatch(
      resetPassword({
        email: localStorage.getItem("user-email"),
        newPassword: password,
      })
    );
    setLoading(false);
    // End The Reset The Password [Loading OFF]
  };

  const result = useSelector((state) => state.authReducer.resetPassword);

  useEffect(() => {
    if (loading === false) {
      if (result) {
        console.log(result);
        if (result.status === 200 || result.status === 201) {
          notify("تم تغير كلمة السر بنجاح", SUCCESS);
          setTimeout(() => navigate("/login"), 1500);
        } else notify("من فضلك اطلب كود جديد", ERROR);
      }
    }
  }, [loading, navigate, result]);

  return [
    password,
    confirmPassword,
    onChangePassword,
    onChangeConfirmPassword,
    handleSubmit,
  ];
};

export default ResetPasswordHook;
