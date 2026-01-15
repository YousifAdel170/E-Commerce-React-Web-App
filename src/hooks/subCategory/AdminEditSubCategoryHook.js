import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

import {
  editSubcategory,
  getSpecificSubCategory,
} from "../../redux/actions/subCategoryAction";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { resetState } from "../../redux/actions/categoryAction";
import { DELAYS } from "../../constants/delays";
import { ROUTES } from "../../constants/routes";

// Hook for editing a category in the admin panel
const AdminEditSubCategoryHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { t } = useTranslation("notification_messages");

  // State variables for category details
  const [subcategoryName, setSubcategoryName] = useState(EMPTY.TEXT);

  const { loading, error } = useSelector((state) => state.allSubCategory);
  const [isPress, setIsPress] = useState(false);

  const [categoryID, setCategoryID] = useState(EMPTY.ZERO);

  // Fetch specific category data when component mounts or id changes
  useEffect(() => {
    const getData = async () => await dispatch(getSpecificSubCategory(id));

    getData();
  }, [id, dispatch]);

  // Selector to get the specific sub category from the Redux store
  const specificSubCategory = useSelector(
    (state) => state.allSubCategory.specificSubcategory
  );

  // Update state variables when specific category data is loaded
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      setSubcategoryName(specificSubCategory?.data?.name);
      setCategoryID(specificSubCategory?.data?.category);
    }
  }, [loading, specificSubCategory]);

  // Handlers for input changes
  const onChangeName = (e) => setSubcategoryName(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subcategoryName.trim() === EMPTY.TEXT)
      return notify(
        t("category.subcategory.nameRequired"),
        NOTIFICATION_TYPES.WARNING
      );
    if (subcategoryName?.length < 3 || subcategoryName?.length > 100)
      return notify(
        t("category.subcategory.nameLength"),
        NOTIFICATION_TYPES.WARNING
      );

    setIsPress(true);

    // Dispatch the action to update the subcategory
    await dispatch(
      editSubcategory(id, {
        name: subcategoryName,
      })
    );
  };

  // Selector to get the result of the edit category action
  const result = useSelector(
    (state) => state.allSubCategory.updatedSubCategory
  );

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading?.update && isPress) {
      setIsPress(false); // Reset loading state
      if (!error?.update && result?.status === STATUS.SUCCESS_OK) {
        notify(t("general.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () =>
            navigate(
              ROUTES.ADMIN.CATEGORIES.SUBCATEGORIES.ALL.replace(
                ":id",
                categoryID
              )
            ),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("general.updateFail"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
    }
  }, [loading, result, navigate, isPress, error, t, dispatch, categoryID]);

  // Return state variables and handlers
  return [subcategoryName, onChangeName, handleSubmit, isPress];
};

export default AdminEditSubCategoryHook;
