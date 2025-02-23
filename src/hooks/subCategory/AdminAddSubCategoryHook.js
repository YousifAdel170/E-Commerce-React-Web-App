import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { createNewSubCategory } from "../../redux/actions/subCategoryAction";
import internetDetect from "../Utility/useInternetConnectionHook";

const ERROR = "Error Error: Request failed with status code 400";

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
      notify("من فضلك ادخل اسم التصنيف", "warn");
      return;
    }

    // Validate the Seletion of the main category
    if (id === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
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
    if (loading === false) {
      // Reset inputs
      setName("");
      setID("0");

      if (subCategory && subCategory.status === 201)
        notify("تمت الاضافة بنجاح", "success");
      else if (subCategory === ERROR)
        notify("هذا الاسم مكرر من فضلك اختر اسم اخر", "warn");
      else {
        notify("هناك مشكله فى عملية الاضافة", "warn");
        dispatch(getAllCategory()); // ✅ Re-fetch categories on success
      }

      setLoading(true);
    }
  }, [loading, subCategory, dispatch]);

  return [name, category, handleChange, handleSubmit, onChangeName];
};

export default AdminAddSubCategoryHook;
