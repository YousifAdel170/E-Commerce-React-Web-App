/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ViewSearchProductHook from "../products/ViewSearchProductHook";

const NavbarSearchHook = () => {
  const [, , , getProduct] = ViewSearchProductHook();

  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchedWord") || ""
  );

  //   When User Type in the Search in the NavBar
  const onChangeSearch = (e) => {
    const value = e.target.value;

    // Update the searched Word
    setSearchWord(value);

    // Set The Value of the word in the local storage
    localStorage.setItem("searchedWord", value);

    // // Get the current path and check if it is already in the products [If u want to redirect the page if the search bar has value (When user enter data in the search bar to search about something)]
    // if (window.location.pathname != "/products")
    //   window.location.href = "/products";
  };

  // Fetch products after debounce
  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [searchWord]);

  return [searchWord, onChangeSearch];
};

export default NavbarSearchHook;
