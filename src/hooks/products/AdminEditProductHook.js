import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getAllCategory, resetState } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getAllSubCategory } from "../../redux/actions/subCategoryAction";
import {
  // getAllProducts,
  getSpecificProduct,
  updateProduct,
} from "../../redux/actions/productsAction";
import notify from "../Utility/useNotifyHook";
import { useNavigate } from "react-router-dom";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { useTranslation } from "react-i18next";
import { EMPTY, STATUS } from "../../constants/general";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";
import { BACKEND_VARIABLES } from "../../constants/backendConstants";

const AdminEditProductHook = (id) => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Translation for notifications
  const { t } = useTranslation("notification_messages");

  // State to detect if the update button is pressed
  const [isPress, setIsPress] = useState(false);

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect(t("error.internetConnectionProblem"));

    const dispatchData = async () => {
      await dispatch(getSpecificProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };

    //
    dispatchData();
  }, [dispatch, id, t]);

  // get the specific Product to be updated by its ID
  const product = useSelector((state) => state.allProduct.viewSpecificProduct);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the categories from the reducer to display it into the selection to be selected
  const brand = useSelector((state) => state.allBrand.brand);

  // get the sub category response to check if the status ok or not
  const subCategory = useSelector((state) => state.allSubCategory.subCategory);

  // Store the selected Sub categories list after being added
  const onSelect = (selectedList) => setSelectedSubID(selectedList);

  // Store the selected Sub categories list after beging removed
  const onRemove = (selectedList) => setSelectedSubID(selectedList || []);

  // State To Show/Hide Color Picker
  const [showColor, setShowColor] = useState(false);

  // State [Array] to store the Selected Colors
  const [colors, setColors] = useState(EMPTY.ARRAY);

  // State [Array] to store the Options of the Sub categories
  const [options, setOptions] = useState(EMPTY.ARRAY);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [qty, setQTY] = useState("");
  const [categoryID, setCategoryID] = useState("0");
  const [brandID, setBrandID] = useState("0");
  const [selectedSubID, setSelectedSubID] = useState(EMPTY.ARRAY);

  // State To Save Array Of Selected Images
  const [images, setImages] = useState(EMPTY.ARRAY);

  useEffect(() => {
    if (product?.data) {
      setImages(product?.data?.images);
      setProductName(product?.data?.title);
      setProductDescription(product?.data?.description);
      setPriceBefore(product?.data?.price);
      setPriceAfter(product?.data?.priceAfterDiscount);
      setQTY(product?.data?.quantity);
      setCategoryID(product?.data?.category);
      setBrandID(product?.data?.brand);
      setColors(product?.data?.availableColors);
    }
  }, [product]);

  const onChangeProdName = (e) => setProductName(e.target.value);
  const onChangeDesName = (e) => setProductDescription(e.target.value);
  const onChangePriceBefor = (e) => setPriceBefore(e.target.value);
  const onChangePriceAfter = (e) => setPriceAfter(e.target.value);
  const onChangeQty = (e) => setQTY(e.target.value);
  const onChangeColor = () => setShowColor(!showColor);

  // Function to handle the color picker
  const handleChangeComplete = (color) => {
    setShowColor(!showColor);
    setColors([...colors, color?.hex]);
  };

  // Function to remove the selected color
  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  // Store The selected CategoryID
  const onSelectCategory = async (e) => setCategoryID(e.target.value);

  useEffect(() => {
    if (categoryID != 0) {
      // Dispatch the subcategories of the category id that has been selected
      const dispatchSubCategories = async () =>
        await dispatch(getAllSubCategory(categoryID));

      dispatchSubCategories();
    }
  }, [categoryID, dispatch]);

  useEffect(() => {
    if (subCategory) setOptions(subCategory?.data);
  }, [subCategory]);

  // ✅ IMPORTANT FIX: match product subcategories AFTER options load
  useEffect(() => {
    if (options?.length && product?.data?.subcategory?.length) {
      const matchedSubCategories = options.filter((option) =>
        product.data.subcategory.some(
          (sub) => sub === option?._id || sub?._id === option?._id
        )
      );

      setSelectedSubID(matchedSubCategories);
    }
  }, [options, product]);

  // Store The selected brandID
  const onSelectBrand = (e) => setBrandID(e.target.value);

  // Function to Convert 64 base Image into File
  function dataURLtoFile(dataurl, filename) {
    // Check if the dataurl is a valid string before using .split()
    if (typeof dataurl !== "string") return null;

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

  // Function to Convert File From the DB to 64 base to be displayed when it is the data fetched from API
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    // const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  // Save Any Item to store the new product
  const handleSubmit = async (e) => {
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

    if (priceBefore <= 0)
      return notify(t("product.priceRequired"), NOTIFICATION_TYPES.WARNING);

    if (priceBefore < priceAfter)
      return notify(
        t("product.priceAfterDiscountInvalid"),
        NOTIFICATION_TYPES.WARNING
      );

    if (priceBefore.length > 32 || priceAfter.length > 32)
      return notify(t("product.priceLength"), NOTIFICATION_TYPES.WARNING);

    if (categoryID === 0)
      return notify(t("product.categoryRequired"), NOTIFICATION_TYPES.WARNING);

    const hasValidImages = Array.isArray(images)
      ? images.length > 0
      : typeof images === "object" && images !== null
      ? Object.keys(images).length > 0
      : false;

    setIsPress(true);

    try {
      // convert base 64 image to file
      let imgCover;

      if (images[0].length <= 1000)
        convertURLtoFile(images[0]).then((val) => (imgCover = val));
      else imgCover = dataURLtoFile(images[0], Math.random() + ".png");

      let itemImages = [];

      // Create an array to store the new images after being converted [same size as the 64 base imaage array]
      Array.from(Array(Object.keys(images).length).keys()).map((_, index) => {
        if (images[index]?.length <= 1000)
          convertURLtoFile(images[index]).then((val) => itemImages.push(val));
        else
          itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"));
      });

      if (imgCover == undefined || itemImages?.length === 0 || !hasValidImages)
        return notify(
          t("product.imageCoverRequired"),
          NOTIFICATION_TYPES.ERROR
        );

      // Build FormData
      const formData = new FormData();
      formData.append(BACKEND_VARIABLES.PRDOUCT.TITLE, productName);
      formData.append(
        BACKEND_VARIABLES.PRDOUCT.DESCRIPTION,
        productDescription
      );
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

      formData.append(BACKEND_VARIABLES.PRDOUCT.CATEGORY, categoryID);
      formData.append(BACKEND_VARIABLES.PRDOUCT.BRAND, brandID);

      setTimeout(() => {
        formData.append(BACKEND_VARIABLES.PRDOUCT.IMAGE_COVER, imgCover);

        itemImages.forEach((img) =>
          formData.append(BACKEND_VARIABLES.PRDOUCT.IMAGES, img)
        );
      }, 1000);

      colors.forEach((color) =>
        formData.append(BACKEND_VARIABLES.PRDOUCT.AVAILABLE_COLORS, color)
      );

      selectedSubID.forEach((sub) =>
        formData.append(BACKEND_VARIABLES.PRDOUCT.SUBCATEGORY, sub?._id)
      );

      // ✅ Dispatch after everything is appended

      setTimeout(() => {
        const getUpdateProduct = async () => {
          await dispatch(updateProduct(id, formData));
        };

        getUpdateProduct();
      }, 1000);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      notify(t("product.updateFail"), NOTIFICATION_TYPES.ERROR);
    }
  };

  const { updatedProduct, loading, error } = useSelector(
    (state) => state.allProduct
  );

  // Reset The Values of the Product
  useEffect(() => {
    // ⛔ do nothing until submit button is pressed
    if (!isPress) return;

    // ⛔ wait until update request finishes
    if (loading?.update) return;

    // reset press flag
    setIsPress(false);

    // ❌ error case
    if (error?.update) {
      notify(t("product.updateFail"), NOTIFICATION_TYPES.ERROR);
      dispatch(resetState());
      return;
    }

    // ✅ success case
    if (
      updatedProduct?.status === STATUS.SUCCESS_OK ||
      updatedProduct?.status === STATUS.SUCCESS_CREATED
    ) {
      notify(t("product.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);

      setTimeout(
        () => navigate(ROUTES.ADMIN.PRODUCTS.ALL),
        DELAYS.NAVIGATION_DELAY
      );
    }

    dispatch(resetState());
  }, [isPress, loading, updatedProduct, error, navigate, t, dispatch]);

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
    selectedSubID,
  ];
};

export default AdminEditProductHook;
