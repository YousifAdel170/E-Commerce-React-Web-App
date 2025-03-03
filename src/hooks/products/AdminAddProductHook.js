import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getAllSubCategory } from "../../redux/actions/subCategoryAction";
import { createNewProduct } from "../../redux/actions/productsAction";
import notify from "../Utility/useNotifyHook";

const AdminAddProductHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect();
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the categories from the reducer to display it into the selection to be selected
  const brand = useSelector((state) => state.allBrand.brand);

  // get the sub category response to check if the status ok or not
  const subCategory = useSelector((state) => state.allSubCategory.subCategory);

  // State To Show/Hide Color Picker
  const [showColor, setShowColor] = useState(false);

  // State [Array] to store the Selected Colors
  const [colors, setColors] = useState([]);

  // State [Array] to store the Options of the Sub categories
  const [options, setOptions] = useState([]);

  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [qty, setQTY] = useState("");
  const [categoryID, setCategoryID] = useState("0");
  const [brandID, setBrandID] = useState("0");
  const [selectedSubID, setSelectedSubID] = useState([]);

  // State To Save Array Of Selected Images
  const [images, setImages] = useState([]);

  //to change name state
  const onChangeProdName = (e) => {
    e.persist();
    setProductName(e.target.value);
  };
  //to change name state
  const onChangeDesName = (event) => {
    event.persist();
    setProductDescription(event.target.value);
  };
  //to change name state
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  //to change name state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAfter(event.target.value);
  }; //to change name state
  const onChangeQty = (event) => {
    event.persist();
    setQTY(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  // Store The selected CategoryID
  const onSelectCategory = async (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory !== "0") {
      await dispatch(getAllSubCategory(selectedCategory));
    }
    setCategoryID(selectedCategory);
  };
  useEffect(() => {
    // console.log(categoryID);
    if (categoryID != 0) {
      if (subCategory.data) {
        setOptions(subCategory.data);
      }
    }
  }, [categoryID, subCategory]);

  // Store The selected brandID
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // Store the selected Sub categories list after being added
  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  // Store the selected Sub categories list after beging removed
  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  // Function to Convert 64 base Image into File
  function dataURLtoFile(dataurl, filename) {
    // Check if the dataurl is a valid string before using .split()
    if (typeof dataurl !== "string") {
      console.error("Invalid dataurl:", dataurl);
      return null;
    }

    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Save Any Item to store the new product
  const handleSubmit = async (e) => {
    // Prevent The Default Action of submit
    e.preventDefault();

    if (
      categoryID === 0 ||
      productName === "" ||
      productDescription === "" ||
      images.length <= 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    // convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");

    // Create an array to store the new images after being converted [same size as the 64 base imaage array]
    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png");
      }
    );

    const formData = new FormData();
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    formData.append("imageCover", imgCover);
    formData.append("category", categoryID);
    formData.append("brand", brandID);

    colors.map((color) => formData.append("availableColors", color));
    selectedSubID.map((item) => formData.append("subcategory", item._id));
    itemImages.map((item) => formData.append("images", item));

    // Start The Adding Operation
    setLoading(true);
    await dispatch(createNewProduct(formData));
    setLoading(false);
    // End The Adding Operation
  };

  // Get the Product Data [Product Response of creation]
  const product = useSelector((state) => state.allProduct.products);

  // Reset The Values of the Product
  useEffect(() => {
    if (loading === false) {
      setColors([]);
      setImages([]);
      setOptions([]);
      setProductName("");
      setProductDescription("");
      setPriceBefore("");
      setPriceAfter("");
      setQTY("");
      setBrandID(0);
      setSelectedSubID([]);
      setCategoryID(0);

      setTimeout(() => setLoading(true), 300);

      if (product) {
        console.log(product);
        //   Check if the response status is OK
        if (product.status === 201 || product.status === 200)
          notify("تمت عملية الاضافة بنجاح", "success");
        else notify("هناك مشكلة في عملية الاضافة", "error");
      }
    }
  }, [loading, product]);

  return [
    categoryID,
    brandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAfter,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onSelectCategory,
    handleSubmit,
    onSelectBrand,
    colors,
    priceBefore,
    qty,
    productDescription,
    productName,
  ];
};

export default AdminAddProductHook;
