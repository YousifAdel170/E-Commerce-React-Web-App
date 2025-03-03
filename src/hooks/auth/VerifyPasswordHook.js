import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";
import { verifyPassword } from "../../redux/actions/authAction";
import { useEffect, useState } from "react";

const VerifyPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  //  Handle The Change of Code Sent By Forgot Password
  const onChangeCode = (e) => setCode(e.target.value);

  //   Handle The Submit of The Code
  const handleSubmit = async () => {
    // Handle if The Inputs are empty
    if (code === "") {
      notify("من فضلك ادخل الكود", ERROR);
      return;
    }

    // Start The Login [Loading ON] &  Dispatch the action Of VerifyThe Code OF Forgotten Password
    setLoading(true);
    await dispatch(
      verifyPassword({
        resetCode: code,
      })
    );
    setLoading(false);
    // End The action Of VerifyThe Code OF Forgotten Password [Loading OFF]
  };

  const result = useSelector((state) => state.authReducer.verifyPassword);

  useEffect(() => {
    if (!loading) {
      if (result) {
        console.log(result);

        if (result.data && result.data.status === "Success") {
          notify("كود التفعيل صحيح", SUCCESS);
          setTimeout(() => navigate("/user/reset-password"), 1500);
        }
        if (result.data && result.data.status === "fail")
          notify("الكود خاطئ او انتهت صلاحيته", ERROR);
      }
    }
  }, [loading, navigate, result]);

  return [code, onChangeCode, handleSubmit];
};

export default VerifyPasswordHook;
