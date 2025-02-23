import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import internetDetect from "../Utility/useInternetConnectionHook";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getAllSubCategory } from "../../redux/actions/subCategoryAction";
import {
  getSpecificProduct,
  updateProduct,
} from "../../redux/actions/productsAction";
import notify from "../Utility/useNotifyHook";

const AdminEditProductHook = (id) => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Fetch categories only once when the component mounts
  useEffect(() => {
    internetDetect();
    const dispatchData = async () => {
      await dispatch(getSpecificProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    dispatchData();
  }, [dispatch, id]);

  // get the specific Product to be updated by its ID
  const product = useSelector((state) => state.allProduct.viewSpecificProduct);

  // get the categories from the reducer to display it into the selection to be selected
  const category = useSelector((state) => state.allCategory.category);

  // get the categories from the reducer to display it into the selection to be selected
  const brand = useSelector((state) => state.allBrand.brand);

  // get the sub category response to check if the status ok or not
  const subCategory = useSelector((state) => state.allSubCategory.subCategory);

  // Store the selected Sub categories list after being added
  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  // Store the selected Sub categories list after beging removed
  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  // State To Show/Hide Color Picker
  const [showColor, setShowColor] = useState(false);

  // State [Array] to store the Selected Colors
  const [colors, setColors] = useState([]);

  // State [Array] to store the Options of the Sub categories
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    if (product && product.data) {
      setImages(product.data.images);
      setProductName(product.data.title);
      setProductDescription(product.data.description);
      setPriceBefore(product.data.price);
      setQTY(product.data.quantity);
      setCategoryID(product.data.category);
      setBrandID(product.data.brand);
      setColors(product.data.availableColors);
    }
  }, [product]);

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

  const handleChangeComplete = (color) => {
    setShowColor(!showColor);

    setColors([...colors, color.hex]);
  };

  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  // Store The selected CategoryID
  const onSelectCategory = async (e) => {
    setCategoryID(e.target.value);
  };

  useEffect(() => {
    if (categoryID != 0) {
      const dispatchSubCategories = async () => {
        // Dispatch the subcategories of the category id that has been selected
        await dispatch(getAllSubCategory(categoryID));
      };

      dispatchSubCategories();
    }
  }, [categoryID, dispatch]);

  useEffect(() => {
    if (subCategory && subCategory.data) setOptions(subCategory.data);
  }, [subCategory]);

  // Store The selected brandID
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
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
    let imgCover;

    if (images[0].length <= 1000) {
      convertURLtoFile(images[0]).then((val) => (imgCover = val));
    } else {
      imgCover = dataURLtoFile(images[0], Math.random() + ".png");
    }

    let itemImages = [];

    // Create an array to store the new images after being converted [same size as the 64 base imaage array]
    Array.from(Array(Object.keys(images).length).keys()).map((_, index) => {
      if (images[index].length <= 1000)
        convertURLtoFile(images[index]).then((val) => itemImages.push(val));
      else
        itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"));
    });

    const formData = new FormData();
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    formData.append("category", categoryID);
    formData.append("brand", brandID);

    setTimeout(() => {
      formData.append("imageCover", imgCover);
      itemImages.map((item) => formData.append("images", item));
    }, 1000);

    colors.map((color) => formData.append("availableColors", color));
    selectedSubID.map((item) => formData.append("subcategory", item._id));

    setTimeout(async () => {
      // Start The Updating Operation
      setLoading(true);
      await dispatch(updateProduct(id, formData));
      setLoading(false);
      // End The Updating Operation
    }, 1000);
  };

  const updatedProduct = useSelector(
    (state) => state.allProduct.updatedProduct
  );

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

      setTimeout(() => setLoading(true), 1500);

      if (updatedProduct) {
        //   Check if the response status is OK

        if (updatedProduct.status === 201 || updatedProduct.status === 200)
          notify("تمت عملية التعديل بنجاح", "success");
        else notify("هناك مشكلة في عملية التعديل", "error");
      }
    }
  }, [loading, updatedProduct]);

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

export default AdminEditProductHook;
