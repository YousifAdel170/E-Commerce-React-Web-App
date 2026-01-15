import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import {
  createNewSubCategory,
  resetState,
} from "../../redux/actions/subCategoryAction";
import internetDetect from "../Utility/useInternetConnectionHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

import { EMPTY, STATUS, STATUS_MESSAGES } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

const AdminAddSubCategoryHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPress, setIsPress] = useState(false);

  const { t } = useTranslation("notification_messages");

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect();

    const getCategories = async () => await dispatch(getAllCategory());
    getCategories();
  }, [dispatch]);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the sub category response to check if the status ok or not
  const createdSubCategory = useSelector(
    (state) => state.allSubCategory.createdSubCategory
  );

  const subCategory = useSelector((state) => state.allSubCategory);

  // Selectors
  const loadingCreate = useSelector(
    (state) => state.allSubCategory.loading.create
  );
  const createError = useSelector((state) => state.allSubCategory.error.create);

  // 0. States
  const [id, setID] = useState(EMPTY.ZERO);
  const [name, setName] = useState(EMPTY.TEXT);

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

    // Validate the name and the selection of the main category of the subcategory
    if (name.trim() === EMPTY.TEXT)
      return notify(
        t("category.subcategory.nameRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    if (name?.length < 3 || name?.length > 100)
      return notify(
        t("category.subcategory.nameLength"),
        NOTIFICATION_TYPES.WARNING
      );

    if (id === EMPTY.ZERO)
      return notify(
        t("category.subcategory.mainCategoryRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    // The Operation has been Started [Start Loading]
    setIsPress(true);
    await dispatch(
      createNewSubCategory({
        name,
        category: id,
      })
    );
    // The Operation has been Ended [End Loading]
  };

  // Handle success/failure messages after submission
  useEffect(() => {
    if (!loadingCreate && isPress) {
      // Reset inputs
      setName(EMPTY.TEXT);
      setID(EMPTY.ZERO);
      setIsPress(false);
      if (
        !createError &&
        createdSubCategory?.status === STATUS.SUCCESS_CREATED
      ) {
        notify(
          t("category.subcategory.addSuccess"),
          NOTIFICATION_TYPES.SUCCESS
        );

        setTimeout(
          () =>
            navigate(
              ROUTES.ADMIN.CATEGORIES.SUBCATEGORIES.ALL.replace(":id", id)
            ),
          DELAYS.NAVIGATION_DELAY
        );
      } else if (
        createError?.status === STATUS.BAD_REQUEST &&
        createError?.response?.data?.message.includes(STATUS_MESSAGES.DUPLICATE)
      )
        notify(t("error.duplicateSubCategory"), NOTIFICATION_TYPES.ERROR);
      else notify(t("category.subcategory.addFail"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
    }
  }, [
    loadingCreate,
    isPress,
    createError,
    createdSubCategory,
    navigate,
    id,
    t,
    dispatch,
    subCategory,
  ]);

  return [name, category, handleChange, handleSubmit, onChangeName, isPress];
};

export default AdminAddSubCategoryHook;
