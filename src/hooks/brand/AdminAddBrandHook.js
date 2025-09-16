import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { createNewBrand } from "../../redux/actions/brandAction";

import uploadImage from "../../assets/Imgs/avatar.png";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { BACKEND_VARIABLES } from "../../constants/backendConstants";
import { useTranslation } from "react-i18next";
import { DELAYS } from "../../constants/delays";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const AdminAddBrandHook = () => {
  // Local states
  const [image, setImage] = useState(uploadImage);
  const [name, setName] = useState(EMPTY.TEXT);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPress, setIsPress] = useState(false);

  const { t } = useTranslation("notification_messages");

  // Selectors
  const loadingCreate = useSelector((state) => state.allBrand.loading.create);
  const createError = useSelector((state) => state.allBrand.error.create);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Image input
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  // Name input
  const onChangeName = (e) => setName(e.target.value);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== EMPTY.TEXT && selectedFile != null) {
      const formData = new FormData();
      formData.append(BACKEND_VARIABLES.BRAND.ADD.NAME, name);
      formData.append(BACKEND_VARIABLES.BRAND.ADD.IMAGE, selectedFile);

      setIsPress(true);

      try {
        await dispatch(createNewBrand(formData));
      } catch (error) {
        console.error("Error creating brand:", error);
        notify(t("general.addFail"), NOTIFICATION_TYPES.ERROR);
        setIsPress(false);
      }
    } else
      notify(t("validation.pleaseCompleteData"), NOTIFICATION_TYPES.WARNING);
  };

  // Watch for result
  useEffect(() => {
    if (!loadingCreate && isPress) {
      setIsPress(false);
      if (!createError) {
        // Reset form only if success
        setImage(uploadImage);
        setName(EMPTY.TEXT);
        setSelectedFile(null);

        notify(t("general.addSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.BRANDS.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("general.addFail"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loadingCreate, createError, t, isPress, navigate]);

  return [image, name, isPress, handleSubmit, onImageChange, onChangeName];
};

export default AdminAddBrandHook;
