// Base URL of favorite products
export const FAVORITE_PRODUCTS_BASE_URL = "http://127.0.0.1:8000/products/";
export const PRODUCTS_BASE_URL = "http://127.0.0.1:8000/products/";
export const CATEGORIES_BASE_URL = "http://127.0.0.1:8000/categories/";

// Importing images for the Slider Component at HomePage
import firstSlider from "./assets/Imgs/slider1.png";
import secondSlider from "./assets/Imgs/slider4.png";
import thirdSlider from "./assets/Imgs/prod4.png";
import fourthSlider from "./assets/Imgs/prod3.png";

// Define the colors for the categories
export const colors = {
  light: [
    "#ffd3e8", // soft pink
    "#f4dba5", // sand yellow
    "#55cfdf", // aqua
    "#ffb3b3", // light red
    "#a5c8ff", // light blue (matches #0d6efd)
    "#d0ffe3", // minty green
  ],
  dark: [
    "#0d6efd", // your main theme blue
    "#00bcd4", // cyan
    "#8e44ad", // deep purple
    "#e67e22", // orange
    "#2ecc71", // green
    "#e91e63", // pink-red
    "#ff5722", // vivid orange
    "#ffc107", // strong yellow
  ],
};

// Slider Component At HomePage Configuration [Array of Objects that contains the data of the slider => title, paragraph, image, styleClass]
const SLIDER_TITLE = "هناك خصم كبير";
const SLIDER_PARAGRAPH = "خصم يصل ٥٠٪ عند شرائك";
const SLIDER_DELAY = 2000;
export const slidersItems = [
  {
    title: SLIDER_TITLE,
    paragraph: SLIDER_PARAGRAPH,
    image: firstSlider,
    styleClass: "one",
    delay: SLIDER_DELAY,
  },
  {
    title: SLIDER_TITLE,
    paragraph: SLIDER_PARAGRAPH,
    image: secondSlider,
    styleClass: "two",
    delay: SLIDER_DELAY,
  },
  {
    title: SLIDER_TITLE,
    paragraph: SLIDER_PARAGRAPH,
    image: thirdSlider,
    styleClass: "three",
    delay: SLIDER_DELAY,
  },
  {
    title: SLIDER_TITLE,
    paragraph: SLIDER_PARAGRAPH,
    image: fourthSlider,
    styleClass: "four",
    delay: SLIDER_DELAY,
  },
];

// HomePage Title Configuration
export const CATEGORIES_TITLE = "التصنيفات";
export const MOST_SOLD_PRODUCTS_TITLE = "الاكثر مبيعا";
export const LATEST_FASHION_PRODUCTS_TITLE = "احدث الازياء";
export const MOST_COMMMON_BRANDS_TITLE = "اشهر الماركات";
export const MORE_BUTTON_TITLE = "المزيد";

// SearchCountResult Component Configuration JSON Object in ShopProductsPage
export const seachCountResultFilter = [
  {
    title: "بدون ترتيب",
    click: "",
    style: "border-bottom card-filter-item",
  },
  {
    title: "الاكثر مبيعا",
    click: "الاكثر مبيعا",
    style: "border-bottom card-filter-item",
  },
  {
    title: "الاعلي تقييما",
    click: "الاعلي تقييما",
    style: "border-bottom card-filter-item",
  },
  {
    title: "السعر من الاقل للاعلي",
    click: "السعر من الاقل للاعلي",
    style: "border-bottom card-filter-item",
  },
  {
    title: "السعر من الاعلي للاقل",
    click: "السعر من الاعلي للاقل",
    style: "card-filter-item",
  },
];
