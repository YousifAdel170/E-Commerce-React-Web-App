import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";
import {
  editCategory,
  getSpecificCategory,
} from "../../redux/actions/categoryAction";

import uploadImage from "../../assets/Imgs/avatar.png";

// Hook for editing a category in the admin panel
const AdminEditCategoryHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for category details
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(uploadImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status
  const [loadingData, setLoadingData] = useState(true); // State for data loading status

  // Fetch specific category data when component mounts or id changes
  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      await dispatch(getSpecificCategory(id));
      setLoadingData(false);
    };

    getData();
  }, [id, dispatch]);

  // Selector to get the specific category from the Redux store
  const specificCategory = useSelector(
    (state) => state.allCategory.viewSpecificCategory
  );

  // Update state variables when specific category data is loaded
  useEffect(() => {
    if (!loadingData) {
      if (specificCategory && specificCategory.data) {
        setCategoryName(specificCategory.data.name);
        setCategoryImage(specificCategory.data.image); // Set the corrected image URL
      }
    }
  }, [loadingData, specificCategory]);

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
  const handleSubmit = async () => {
    if (
      categoryName === "" ||
      (selectedFile === null && categoryImage === uploadImage)
    ) {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true);

    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append("name", categoryName);
    if (selectedFile) {
      formData.append("image", selectedFile); // The selected file for the image
    }

    // Dispatch the action to update the category
    await dispatch(editCategory(id, formData)); // Dispatch the edit action with formData
    setLoading(false);
  };

  // Selector to get the result of the edit category action
  const result = useSelector((state) => state.allCategory.updatedCategory);

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS);
        setTimeout(() => {
          navigate("/admin/all-categories"); // Navigate to the all categories page
        }, 1000);
      } else {
        notify("فشل في عملية التعديل", ERROR);
      }
    }
  }, [loading, result, navigate]);

  // Return state variables and handlers
  return [
    categoryName,
    categoryImage,
    onChangeName,
    onChangeImage,
    handleSubmit,
  ];
};

export default AdminEditCategoryHook;
