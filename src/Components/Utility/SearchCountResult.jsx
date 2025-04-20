/* eslint-disable react/prop-types */

// Import Used Components
import UnopDropdown from "unop-react-dropdown";

// Import Assets
import sort from "../../Assets/Imgs/sort.png";

// Import Configuartions
import { seachCountResultFilter } from "../../config";

import "./SearchCountResult.css";

// Component Responsible for displaying the search count result and sorting options
const SearchCountResult = ({ title, onClickGetProduct }) => {
  // Function to handle the appearance and disappearance of the dropdown
  const handler = () => {};

  // Function to handle the click event on sorting options
  const clickMe = (key) => {
    localStorage.setItem("sortType", key);
    onClickGetProduct();
  };
  return (
    <div className="d-flex justify-content-between pt-3 px-2">
      {/* Display the title of the search result */}
      <div className="sub-title">{title}</div>

      <div className="search-count-text d-flex">
        {/* Dropdown for sorting options */}
        <UnopDropdown
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <>
              <img
                width={"20px"}
                height={"20px"}
                className="ms-2"
                src={sort}
                alt="Sort Image"
              />
              ترتيب حسب
            </>
          }
          delay={0}
          align="CENTER"
          hover
        >
          <div className="card-filter">
            {seachCountResultFilter
              ? seachCountResultFilter.map((search, index) => (
                  <div
                    key={index}
                    className={search.style}
                    onClick={() => clickMe(search.click)}
                  >
                    {search.title}
                  </div>
                ))
              : null}
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

// Exporting the SearchCountResult component to be used in other parts of the application
export default SearchCountResult;
