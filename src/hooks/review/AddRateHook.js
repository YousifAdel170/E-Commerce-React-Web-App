import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";

import { ERROR, SUCCESS } from "../../config";
import { createReview } from "../../redux/actions/reviewAction";

const AddRateHook = (id) => {
  //   Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  //   States
  const [rateText, setRateText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [loading, setLoading] = useState(false);

  //   Handle The Rate Text Change
  const onChangeRateText = (e) => {
    setRateText(e.target.value);
  };

  //   Handle The Rate Value Change
  const onChangeRateValue = (e) => {
    setRateValue(e);
  };

  //   Get the user from the local storage
  const user = useMemo(() => {
    if (localStorage.getItem("user") != null)
      return JSON.parse(localStorage.getItem("user"));
    else return null;
  }, []);

  //   Get the user name
  const userName = useMemo(() => {
    if (user) return user.name;
    else return "";
  }, [user]);

  //   Handle The Submit Of Adding Rate
  const handleSubmit = async () => {
    // check if the rate value is 0
    if (rateValue === 0) {
      notify("من فضلك ادخل تقييم", ERROR);
      return;
    }

    // check if the rate text is empty
    if (rateText === "") {
      notify("من فضلك اكتب تعليق", ERROR);
      return;
    }

    //   Set the loading to true
    setLoading(true);

    //   Dispatch the action to add the rate
    await dispatch(
      createReview(id, {
        review: rateText,
        rating: rateValue,
      })
    );

    //   Set the loading to false
    setLoading(false);
  };

  //   Return the Response of the action of adding the rate
  const result = useSelector((state) => state.reviewReducer.createReview);

  //   Check if the loading is false and the result is not null
  useEffect(() => {
    //  Check if the Creation of the rate is done
    if (!loading) {
      // check if the result is loaded
      if (result) {
        // Check if the status is there
        if (result.status) {
          // Make Sure That The Admin Can't Rate
          if (result.status === 403) {
            notify("غير مسموح للادمن بالتقييم", ERROR);
            return;
          }

          // Check if the user has already rated
          else if (result.status === 400) {
            notify("لقد قمت باضافة تقييم لهذا المنتج مسبقا", ERROR);
            return;
          }

          //   Check if the rate is added successfully
          else if (result.status === 200 || result.status === 201) {
            notify("تمت اضافة التقييم بنجاح", SUCCESS);
            setTimeout(() => {
              window.location.reload(false);
            }, 1000);
          }
        }
      }
    }
  }, [loading, result]);

  return [
    rateText,
    onChangeRateText,
    onChangeRateValue,
    userName,
    handleSubmit,
  ];
};

export default AddRateHook;
