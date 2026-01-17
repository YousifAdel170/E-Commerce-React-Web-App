import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getAllSubCategory } from "../../redux/actions/subCategoryAction";
import {
  createNewProduct,
  resetState,
} from "../../redux/actions/productsAction";
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";
import { BACKEND_VARIABLES } from "../../constants/backendConstants";

const AdminAddProductHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation("notification_messages");

  const loadingCreate = useSelector((state) => state.allProduct.loading.create);
  const createError = useSelector((state) => state.allProduct.error.create);

  const [isPress, setIsPress] = useState(false);

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect(t("error.internetConnectionProblem"));

    const getData = async () => {
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };

    getData();
  }, [dispatch, t]);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the categories from the reducer to display it into the selection to be selected
  const brand = useSelector((state) => state.allBrand.brand);

  // get the sub category response to check if the status ok or not
  const subCategory = useSelector((state) => state.allSubCategory.subCategory);

  // State To Show/Hide Color Picker
  const [showColor, setShowColor] = useState(false);

  // State [Array] to store the Selected Colors
  const [colors, setColors] = useState(EMPTY.ARRAY);

  // State [Array] to store the Options of the Sub categories
  const [options, setOptions] = useState(EMPTY.ARRAY);

  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  const [productName, setProductName] = useState(EMPTY.TEXT);
  const [productDescription, setProductDescription] = useState(EMPTY.TEXT);
  const [priceBefore, setPriceBefore] = useState(EMPTY.TEXT);
  const [priceAfter, setPriceAfter] = useState(EMPTY.TEXT);
  const [qty, setQTY] = useState(EMPTY.TEXT);
  const [categoryID, setCategoryID] = useState(EMPTY.ZERO);
  const [brandID, setBrandID] = useState(EMPTY.ZERO);
  const [selectedSubID, setSelectedSubID] = useState(EMPTY.ARRAY);

  // State To Save Array Of Selected Images
  const [images, setImages] = useState(EMPTY.ARRAY);

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
    if (selectedCategory !== EMPTY.ZERO) {
      await dispatch(getAllSubCategory(selectedCategory));
    }
    setCategoryID(selectedCategory);
  };
  useEffect(() => {
    if (categoryID != EMPTY.ZERO) {
      if (subCategory) setOptions(subCategory?.data);
    }
  }, [categoryID, subCategory]);

  // Store The selected brandID
  const onSelectBrand = (e) => setBrandID(e.target.value);

  // Store the selected Sub categories list after being added
  const onSelect = (selectedList) => setSelectedSubID(selectedList);

  // Store the selected Sub categories list after beging removed
  const onRemove = (selectedList) => setSelectedSubID(selectedList);

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

    if (productName.trim() === EMPTY.TEXT)
      return notify(t("product.nameRequired"), NOTIFICATION_TYPES.WARNING);

    if (productName.length < 3 || productName.length > 100)
      return notify(t("product.nameLength"), NOTIFICATION_TYPES.WARNING);

    if (productDescription.trim() === EMPTY.TEXT)
      return notify(
        t("product.descriptionRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    if (productDescription.length > 2000)
      return notify(t("product.descriptionLength"), NOTIFICATION_TYPES.WARNING);

    if (qty <= 0)
      return notify(t("product.quantityRequired"), NOTIFICATION_TYPES.WARNING);

    if (priceBefore < priceAfter && priceBefore != 0)
      return notify(
        t("product.priceAfterDiscountInvalid"),
        NOTIFICATION_TYPES.WARNING
      );

    if (priceBefore.length > 32 || priceAfter.length > 32)
      return notify(t("product.priceLength"), NOTIFICATION_TYPES.WARNING);

    if (categoryID === "0")
      return notify(t("product.categoryRequired"), NOTIFICATION_TYPES.WARNING);

    if (brandID === "0")
      return notify(t("product.brandRequired"), NOTIFICATION_TYPES.WARNING);

    // convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");

    // Create an array to store the new images after being converted [same size as the 64 base imaage array]
    const itemImages = Array.from(
      Array(Object.keys(images)?.length).keys()
    ).map((item, index) => {
      return dataURLtoFile(images[index], Math.random() + ".png");
    });

    if (imgCover == undefined || itemImages.length === 0)
      return notify(t("product.imageCoverRequired"), NOTIFICATION_TYPES.ERROR);

    const formData = new FormData();
    formData.append(BACKEND_VARIABLES.PRDOUCT.TITLE, productName);
    formData.append(BACKEND_VARIABLES.PRDOUCT.DESCRIPTION, productDescription);
    formData.append(BACKEND_VARIABLES.PRDOUCT.QUANTITY, qty);
    formData.append(
      BACKEND_VARIABLES.PRDOUCT.PRICE_BEFORE_DISCOUNT,
      priceBefore
    );

    if (priceAfter) {
      formData.append(
        BACKEND_VARIABLES.PRDOUCT.PRICE_AFTER_DISCOUNT,
        priceAfter
      );
    }

    formData.append(BACKEND_VARIABLES.PRDOUCT.IMAGE_COVER, imgCover);
    formData.append(BACKEND_VARIABLES.PRDOUCT.CATEGORY, categoryID);
    formData.append(BACKEND_VARIABLES.PRDOUCT.BRAND, brandID);

    colors.map((color) =>
      formData.append(BACKEND_VARIABLES.PRDOUCT.AVAILABLE_COLORS, color)
    );
    selectedSubID.map((item) =>
      formData.append(BACKEND_VARIABLES.PRDOUCT.SUBCATEGORY, item?._id)
    );
    itemImages.map((item) =>
      formData.append(BACKEND_VARIABLES.PRDOUCT.IMAGES, item)
    );

    // Start The Adding Operation
    setIsPress(true);

    try {
      //   Get the Response from the createNewProduct action by dispatching
      await dispatch(createNewProduct(formData));
    } catch (error) {
      console.error("Error creating product:", error);
      notify(t("product.addFail"), NOTIFICATION_TYPES.ERROR);
      setIsPress(false);
    }

    // End The Adding Operation
  };

  // Get the Product Data [Product Response of creation]
  const { createdProduct } = useSelector((state) => state.allProduct);

  // Reset The Values of the Product
  useEffect(() => {
    if (!loadingCreate && isPress) {
      setIsPress(false);

      if (!createError) {
        setColors(EMPTY.ARRAY);
        setImages(EMPTY.ARRAY);
        setOptions(EMPTY.ARRAY);
        setProductName(EMPTY.TEXT);
        setProductDescription(EMPTY.TEXT);
        setPriceBefore(EMPTY.TEXT);
        setPriceAfter(EMPTY.TEXT);
        setQTY(EMPTY.TEXT);
        setBrandID(EMPTY.ZERO);
        setSelectedSubID(EMPTY.ARRAY);
        setCategoryID(EMPTY.ZERO);

        notify(t("product.addSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.PRODUCTS.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      }

      dispatch(resetState());
    }
  }, [
    loadingCreate,
    createdProduct,
    createError,
    isPress,
    t,
    dispatch,
    navigate,
  ]);

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
    isPress,
  ];
};

export default AdminAddProductHook;
