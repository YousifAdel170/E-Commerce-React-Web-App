import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";

import {
  editSubcategory,
  getSpecificSubCategory,
} from "../../redux/actions/subCategoryAction";

// Hook for editing a category in the admin panel
const AdminEditSubCategoryHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for category details
  const [subcategoryName, setSubcategoryName] = useState("");

  const [loading, setLoading] = useState(true); // State for loading status
  const [loadingData, setLoadingData] = useState(true); // State for data loading status

  // Fetch specific category data when component mounts or id changes
  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      await dispatch(getSpecificSubCategory(id));
      setLoadingData(false);
    };

    getData();
  }, [id, dispatch]);

  // Selector to get the specific sub category from the Redux store
  const specificSubCategory = useSelector(
    (state) => state.allSubCategory.specificSubcategory
  );

  // Update state variables when specific category data is loaded
  useEffect(() => {
    if (!loadingData) {
      if (specificSubCategory && specificSubCategory.data)
        setSubcategoryName(specificSubCategory.data.name);
    }
  }, [loadingData, specificSubCategory]);

  // Handlers for input changes
  const onChangeName = (event) => {
    event.persist();
    setSubcategoryName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (subcategoryName === "") {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true);
    // Dispatch the action to update the category
    await dispatch(
      editSubcategory(id, {
        name: subcategoryName,
      })
    ); // Dispatch the edit action with formData
    setLoading(false);
  };

  // Selector to get the result of the edit category action
  const result = useSelector(
    (state) => state.allSubCategory.updatedSubCategory
  );

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS);
        setTimeout(() => {
          navigate("/admin/all-categories");
        }, 1000);
      } else notify("فشل في عملية التعديل", ERROR);
    }
  }, [loading, result, navigate]);

  // Return state variables and handlers
  return [subcategoryName, onChangeName, handleSubmit];
};

export default AdminEditSubCategoryHook;
