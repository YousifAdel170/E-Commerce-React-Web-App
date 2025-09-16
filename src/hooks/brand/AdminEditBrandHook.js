import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

import uploadImage from "../../assets/Imgs/avatar.png";
import { editBrand, getSpecificBrand } from "../../redux/actions/brandAction";
import { useTranslation } from "react-i18next";
import { EMPTY, STATUS } from "../../constants/general";
// import { BACKEND_VARIABLES } from "../../constants/backendConstants";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook for editing a brand in the admin panel
const AdminEditBrandHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for brand details
  const [brandName, setBrandName] = useState(EMPTY.TEXT);
  const [brandImage, setBrandImage] = useState(uploadImage);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isPress, setIsPress] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { t } = useTranslation("notification_messages");

  // Fetch specific brand data when component mounts or id changes
  useEffect(() => {
    const getData = async () => await dispatch(getSpecificBrand(id));

    getData();
  }, [id, dispatch]);

  const { viewSpecificBrand, loading, updatedBrand } = useSelector(
    (state) => state.allBrand
  );

  // Update state variables when specific brand data is loaded
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      if (viewSpecificBrand?.data) {
        setBrandName(viewSpecificBrand?.data?.name);
        setBrandImage(viewSpecificBrand?.data?.image); // Set the corrected image URL
      }
    }
  }, [loading, viewSpecificBrand]);

  // Handlers for input changes
  const onChangeName = (event) => {
    event.persist();
    setBrandName(event.target.value);
  };

  const onChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBrandImage(URL.createObjectURL(event.target.files[0])); // Image preview
      setSelectedFile(event.target.files[0]); // Save the selected file
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      brandName === EMPTY.TEXT ||
      (selectedFile === null && brandImage === uploadImage)
    ) {
      notify(t("validation.pleaseCompleteData"), NOTIFICATION_TYPES.WARNING);
      return;
    }

    // // Create FormData to send to the backend
    // const formData = new FormData();
    // formData.append(BACKEND_VARIABLES.BRAND.ADD.NAME, brandName); // The name of the brand
    // formData.append(BACKEND_VARIABLES.BRAND.ADD.IMAGE, selectedFile);

    setIsPress(true); // Start loading state
    setIsLoading(true);
    // Dispatch the action to update the brand
    await dispatch(
      editBrand(id, {
        name: brandName,
        image: selectedFile, // Use the selected file or the existing image
      })
    ); // Dispatch the edit action with formData
    setIsLoading(false);
  };

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!isLoading && !loading?.update) {
      setIsPress(false); // Stop loading state
      if (updatedBrand?.status === STATUS.SUCCESS_OK) {
        notify(t("general.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.BRANDS.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("general.updateFail"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, updatedBrand, navigate, t, isLoading]);

  // Return state variables and handlers
  return [
    brandName,
    brandImage,
    onChangeName,
    onChangeImage,
    handleSubmit,
    isPress,
  ];
};

export default AdminEditBrandHook;
