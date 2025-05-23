import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";

import uploadImage from "../../assets/Imgs/avatar.png";
import { editBrand, getSpecificBrand } from "../../redux/actions/brandAction";

// Hook for editing a brand in the admin panel
const AdminEditBrandHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for brand details
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(uploadImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status
  const [loadingData, setLoadingData] = useState(true); // State for data loading status

  // Fetch specific brand data when component mounts or id changes
  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      await dispatch(getSpecificBrand(id));
      setLoadingData(false);
    };

    getData();
  }, [id, dispatch]);

  // Selector to get the specific Brand from the Redux store
  const specificBrand = useSelector(
    (state) => state.allBrand.viewSpecificBrand
  );

  // Update state variables when specific brand data is loaded
  useEffect(() => {
    if (!loadingData) {
      if (specificBrand && specificBrand.data) {
        setBrandName(specificBrand.data.name);
        setBrandImage(specificBrand.data.image); // Set the corrected image URL
      }
    }
  }, [loadingData, specificBrand]);

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
  const handleSubmit = async () => {
    if (
      brandName === "" ||
      (selectedFile === null && brandImage === uploadImage)
    ) {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true);

    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append("name", brandName); // The name of the brand
    formData.append("image", selectedFile);

    // Dispatch the action to update the brand
    await dispatch(
      editBrand(id, {
        name: brandName,
        image: selectedFile, // Use the selected file or the existing image
      })
    ); // Dispatch the edit action with formData
    setLoading(false);
  };

  // Selector to get the result of the edit brand action
  const result = useSelector((state) => state.allBrand.updatedBrand);

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS);
        setTimeout(() => {
          navigate("/admin/all-brands"); // Navigate to the all brands page
        }, 1000);
      } else {
        notify("فشل في عملية التعديل", ERROR);
      }
    }
  }, [loading, result, navigate]);

  // Return state variables and handlers
  return [brandName, brandImage, onChangeName, onChangeImage, handleSubmit];
};

export default AdminEditBrandHook;
