import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { createNewCategory } from "../../redux/actions/categoryAction";

import uploadImage from "../../assets/Imgs/avatar.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { EMPTY } from "../../constants/general";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

import { BACKEND_VARIABLES } from "../../constants/backendConstants";

const AdminAddCategoryHook = () => {
  // 0. States [image: new uploaded item  | name: Item name]
  const [image, setImage] = useState(uploadImage);
  const [name, setName] = useState(EMPTY.TEXT);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPress, setIsPress] = useState(false);

  const { t } = useTranslation("notification_messages");

  // Selectors
  const loadingCreate = useSelector(
    (state) => state.allCategory.loading.create
  );
  const createError = useSelector((state) => state.allCategory.error.create);

  // 1. Display choosed Image from the Local PC
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0])); // Image
      setSelectedFile(event.target.files[0]); // File
    }
  };

  // 2. Save The Name
  const onChangeName = (e) => setName(e.target.value);

  // 4. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 5. Save The Data into the DB
  const handleSubmit = async (e) => {
    // a. Prevent The Default Action of submit
    e.preventDefault();

    if (name.trim() === EMPTY.TEXT)
      return notify(t("category.nameRequired"), NOTIFICATION_TYPES.WARNING);

    if (name?.length < 3 || name?.length > 100)
      return notify(t("category.nameLength"), NOTIFICATION_TYPES.WARNING);

    if (selectedFile == null)
      return notify(t("category.imageRequired"), NOTIFICATION_TYPES.WARNING);

    // b. Validate the inputs [image + text]
    if (name !== EMPTY.TEXT && selectedFile != null) {
      // i. Create formData to store the name and the selected file
      const formData = new FormData();
      formData.append(BACKEND_VARIABLES.CATEGORY.ADD.NAME, name);
      formData.append(BACKEND_VARIABLES.CATEGORY.ADD.IMAGE, selectedFile);

      // ii. Since the operation are working the loading is ON and the submit button is Pressed
      setIsPress(true);

      // iii. check if the response if success or failed
      try {
        //   Get the Response from the createNewCategory action by dispatching
        await dispatch(createNewCategory(formData));
      } catch (error) {
        console.error("Error creating category:", error);
        notify(t("category.addFail"), NOTIFICATION_TYPES.ERROR);
        setIsPress(false);
      }
      //   The User Entered Empty Data
    }
  };

  useEffect(() => {
    if (!loadingCreate && isPress) {
      setIsPress(false);
      if (!createError) {
        // Reset form only if success
        setImage(uploadImage);
        setName(EMPTY.TEXT);
        setSelectedFile(null);
        notify(t("category.addSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.CATEGORIES.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("category.addFail"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loadingCreate, createError, t, isPress, navigate]);

  //   Return the Data To The JSX code
  return [image, name, isPress, handleSubmit, onImageChange, onChangeName];
};

export default AdminAddCategoryHook;
