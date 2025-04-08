// Number of Items To be displayed in each page
export const PAGE_PRODUCTS_LIMIT = 12;

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
