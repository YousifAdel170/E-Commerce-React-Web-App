import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { createNewSubCategory } from "../../redux/actions/subCategoryAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";
import {
  BACKEND_ERROR_MESSAGES,
  GENERAL_MESSAGES,
  SUBCATEGORY_MESSAGES,
} from "../../constants/messagesConstants";

const AdminAddSubCategoryHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllCategory());
  }, [dispatch]);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the sub category response to check if the status ok or not
  const subCategory = useSelector((state) => state.allSubCategory.subCategory);

  // 0. States
  const [id, setID] = useState("0");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Save selected category ID
  const handleChange = (e) => setID(e.target.value);
  // Save subcategory name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  // Handle the Save Button
  const handleSubmit = async (e) => {
    // a. Prevent The Default Action of submit
    e.preventDefault();

    // Check Internet Connection
    internetDetect();

    // Validate the name of the subcategory
    if (name === "") {
      notify(SUBCATEGORY_MESSAGES.NAME_REQUIRED, WARNING);
      return;
    }

    // Validate the Seletion of the main category
    if (id === "0") {
      notify(SUBCATEGORY_MESSAGES.MAIN_CATEGORY_REQUIRED, WARNING);
      return;
    }

    // The Operation has been Started [Start Loading]
    setLoading(true);
    await dispatch(
      createNewSubCategory({
        name,
        category: id,
      })
    );
    // The Operation has been Ended [End Loading]
    setLoading(false);
  };

  // Handle success/failure messages after submission
  useEffect(() => {
    if (!loading) {
      // Reset inputs
      setName("");
      setID("0");

      if (subCategory?.status === 201)
        notify(GENERAL_MESSAGES.ADD_SUCCESSFULLY, SUCCESS);
      else if (subCategory === BACKEND_ERROR_MESSAGES.ERROR_400)
        notify(SUBCATEGORY_MESSAGES.DUPLICATE_NAME, ERROR);
      else {
        notify(GENERAL_MESSAGES.ADD_FAILED, ERROR);
        dispatch(getAllCategory()); // ✅ Re-fetch categories on success
      }

      setLoading(true);
    }
  }, [loading, subCategory, dispatch]);

  return [name, category, handleChange, handleSubmit, onChangeName];
};

export default AdminAddSubCategoryHook;
