import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { createNewCategory } from "../../redux/actions/categoryAction";

import uploadImage from "../../assets/Imgs/avatar.png";

const AdminAddCategoryHook = () => {
  // 0. States [image: new uploaded item  | name: Item name]
  const [image, setImage] = useState(uploadImage);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // 1. Display choosed Image from the Local PC
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0])); // Image
      setSelectedFile(event.target.files[0]); // File
    }
  };

  // 2. Save The Name
  const onChangeName = (e) => {
    e.persist(); // prevents React from clearing the event, allowing you to use it later if needed.
    setName(e.target.value);
  };

  //  3. Select All Categories Data
  const result = useSelector((state) => state.allCategory.category);

  // 4. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 5. Save The Data into the DB
  const handleSubmit = async (e) => {
    // a. Prevent The Default Action of submit
    e.preventDefault();

    // b. Validate the inputs [image + text]
    if (name != "" && selectedFile != null) {
      // i. Create formData to store the name and the selected file
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", selectedFile);

      // ii. Since the operation are working the loading is ON and the submit button is Pressed
      setLoading(true);
      setIsPress(true);

      // iii. check if the response if success or failed
      try {
        //   Get the Response from the createNewCategory action by dispatching
        const response = await dispatch(createNewCategory(formData));
        console.log("Response: " + response);
      } catch (error) {
        console.error("Error creating category:", error);
        notify("حدثت مشكلة أثناء الإضافة", "error");
      } finally {
        // Since the result received (Turn the Loading OFF)
        setLoading(false);
      }

      //   The User Entered Empty Data
    } else {
      console.log("من فضلك اكمل البيانات");
      notify("من فضلك اكمل البيانات", "warn");
    }
  };

  useEffect(() => {
    if (loading === false) {
      setImage(uploadImage);
      setName("");
      setSelectedFile(null);

      //   console.log("تم االانتهاء");

      setLoading(true);

      setTimeout(() => {
        setIsPress(false);
      }, 1000);

      //   Check if the response status is OK
      if (result.status === 201) {
        notify("تمت عملية الاضافة بنجاح", "success");
      } else notify("هناك مشكلة في عملية الاضافة", "error");
    }
  }, [loading, result]);

  //   Return the Data To The JSX code
  return [
    image,
    name,
    loading,
    isPress,
    handleSubmit,
    onImageChange,
    onChangeName,
  ];
};

export default AdminAddCategoryHook;
