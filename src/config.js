// Base URL of favorite products
export const FAVORITE_PRODUCTS_BASE_URL = "http://127.0.0.1:8000/products/";
export const PRODUCTS_BASE_URL = "http://127.0.0.1:8000/products/";
export const CATEGORIES_BASE_URL = "http://127.0.0.1:8000/categories/";


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
