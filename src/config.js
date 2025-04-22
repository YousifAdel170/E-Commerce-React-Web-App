// Number of Items To be displayed in each page
export const PAGE_PRODUCTS_LIMIT = 12;

// Number of Items To be displayed in each page for the categories
export const PAGE_CATEGORIES_LIMIT = 10;

// Number of Items To be displayed in each page for the brands
export const PAGE_BRANDS_LIMIT = 10;

// Number of Items To be displayed in each page for the favorite products
export const PAGE_FAVORITE_PRODUCTS_LIMIT = 10;

// Number of Items To be displayed of Categories in the HomePage
export const PAGE_CATEGORIES_HOME_LIMIT = 5;

// Number of Items To be displayed of Brands in the HomePage
export const PAGE_BRANDS_HOME_LIMIT = 5;

// Number of Items To be displayed of Products in the HomePage
export const PAGE_PRODUCTS_HOME_LIMIT = 5;

// Number of Items To be displayed of Favorite Products in the HomePage
export const PAGE_FAVORITE_PRODUCTS_HOME_LIMIT = 5;

// Number of Rates To be displayed of Details Product in the ProductDetailsPage
export const PRODUCT_DETAILS_RATES_LIMIT = 3;

// Number of Rates To be displayed of Details Product in the ProductDetailsPage
export const PAGE_NUMBER_PRODUCT_DETAILS_RATES = 1;

// Types of Inputs
export const NAME_TYPE = "name";
export const EMAIL_TYPE = "email";
export const PASSWORD_TYPE = "password";
export const CONFIRMATION_PASSWORD_TYPE = "confirmPassword";
export const PHONE_TYPE = "phone";

// Noftification Types
export const SUCCESS = "success";
export const ERROR = "error";
export const WARNING = "warn";

// Validation ERRORS
export const EMAIL_ALREADY_USED = "E-mail already in use";
export const EGYPT_NUMBERS_ONLY = "accept only egypt phone numbers";
export const PASSWORD_VALIDATION = "must be at least 6 chars";
export const LOGIN_WRONG = "Incorrect email or password";

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
