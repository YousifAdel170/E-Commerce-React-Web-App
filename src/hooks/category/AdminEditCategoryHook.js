import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import {
  editCategory,
  getSpecificCategory,
} from "../../redux/actions/categoryAction";

import uploadImage from "../../assets/Imgs/avatar.png";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
// import { BACKEND_VARIABLES } from "../../constants/backendConstants";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook for editing a category in the admin panel
const AdminEditCategoryHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for category details
  const [categoryName, setCategoryName] = useState(EMPTY.TEXT);
  const [categoryImage, setCategoryImage] = useState(uploadImage);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isPress, setIsPress] = useState(false);

  const { t } = useTranslation("notification_messages");

  // Fetch specific category data when component mounts or id changes
  useEffect(() => {
    const getData = async () => await dispatch(getSpecificCategory(id));

    getData();
  }, [id, dispatch]);

  // Selector to get the specific category from the Redux store
  const { viewSpecificCategory, loading, updatedCategory } = useSelector(
    (state) => state.allCategory
  );

  // Update state variables when specific category data is loaded
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      if (viewSpecificCategory?.data) {
        setCategoryName(viewSpecificCategory?.data?.name);
        setCategoryImage(viewSpecificCategory?.data?.image); // Set the corrected image URL
      }
    }
  }, [loading, viewSpecificCategory]);

  // Handlers for input changes
  const onChangeName = (event) => {
    event.persist();
    setCategoryName(event.target.value);
  };

  const onChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCategoryImage(URL.createObjectURL(event.target.files[0])); // Image preview
      setSelectedFile(event.target.files[0]); // Save the selected file
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName.trim() === EMPTY.TEXT)
      return notify(t("category.nameRequired"), NOTIFICATION_TYPES.WARNING);

    if (categoryName?.length < 3 || categoryName?.length > 100)
      return notify(t("category.nameLength"), NOTIFICATION_TYPES.WARNING);

    if (!selectedFile && categoryImage === EMPTY.TEXT)
      return notify(t("category.imageRequired"), NOTIFICATION_TYPES.WARNING);

    setIsLoading(true);
    setIsPress(true); // Stop loading state

    // Dispatch the action to update the category
    await dispatch(
      editCategory(id, {
        name: categoryName,
        image: selectedFile, // Use the selected file or the existing image
      })
    ); // Dispatch the edit action with formData
    setIsLoading(false);
  };

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!isLoading && !loading?.update) {
      setIsPress(false); // Stop loading state

      if (updatedCategory?.status === STATUS.SUCCESS_OK) {
        notify(t("category.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.CATEGORIES.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("category.updateFail"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, updatedCategory, navigate, isLoading, t]);

  // Return state variables and handlers
  return [
    categoryName,
    categoryImage,
    onChangeName,
    onChangeImage,
    handleSubmit,
    isPress,
  ];
};

export default AdminEditCategoryHook;
