/* eslint-disable react/prop-types */
import sort from "../../Assets/Imgs/sort.png";
import UnopDropdown from "unop-react-dropdown";

const SearchCountResult = ({ title, onClickGetProduct }) => {
  const handler = () => {};

  const clickMe = (key) => {
    localStorage.setItem("sortType", key);
    onClickGetProduct();
  };
  return (
    <div className="d-flex justify-content-between pt-3 px-2">
      <div className="sub-title">{title}</div>
      <div className="search-count-text d-flex">
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
                alt="Sort Img"
              />
              ترتيب حسب
            </>
          }
          delay={0}
          align="CENTER"
          hover
        >
          <div className="card-filter">
            <div
              onClick={() => clickMe("")}
              className="border-bottom card-filter-item"
            >
              بدون ترتيب
            </div>

            <div
              onClick={() => clickMe("الاكثر مبيعا")}
              className="border-bottom card-filter-item"
            >
              الاكثر مبيعا
            </div>

            <div
              onClick={() => clickMe("الاعلي تقييما")}
              className="border-bottom card-filter-item"
            >
              الاعلي تقييما
            </div>

            <div
              onClick={() => clickMe("السعر من الاقل للاعلي")}
              className="border-bottom card-filter-item"
            >
              السعر من الاقل للاعلي
            </div>

            <div
              onClick={() => clickMe("السعر من الاعلي للاقل")}
              className="card-filter-item"
            >
              السعر من الاعلي للاقل
            </div>
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default SearchCountResult;
