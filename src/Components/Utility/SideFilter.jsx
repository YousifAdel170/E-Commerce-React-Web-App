import { Row } from "react-bootstrap";
import SidebarSearchHook from "../../hooks/search/SidebarSearchHook";

const SideFilter = () => {
  const [
    categoriesData,
    brandsData,
    clickCategory,
    clickBrand,
    priceFromUpdate,
    priceToUpdate,
  ] = SidebarSearchHook();

  let localFrom = localStorage.getItem("priceFrom");
  let localTo = localStorage.getItem("priceTo");
  return (
    <div className="mt-3">
      <Row>
        {/* Categories */}
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input onChange={clickCategory} type="checkbox" value={"0"} />
            <div className="filter-sub me-2">الكل</div>
          </div>

          {categoriesData ? (
            categoriesData.map((item, index) => (
              <div key={index} className="d-flex mt-2">
                <input
                  onChange={clickCategory}
                  type="checkbox"
                  value={item._id}
                />
                <div className="filter-sub me-2">{item.name}</div>
              </div>
            ))
          ) : (
            <h6>لا يوجد تصنيفات</h6>
          )}
        </div>

        {/* Brands */}
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الماركة</div>
          <div className="d-flex mt-3">
            <input onChange={clickBrand} type="checkbox" value="0" />
            <div className="filter-sub me-2">الكل</div>
          </div>
          {brandsData ? (
            brandsData.map((item, index) => (
              <div key={index} className="d-flex mt-3">
                <input onChange={clickBrand} type="checkbox" value={item._id} />
                <div className="filter-sub me-2 ">{item.name}</div>
              </div>
            ))
          ) : (
            <h6>لا يوجد ماركات</h6>
          )}
        </div>

        {/* Price From & Price To */}
        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          {/* Price From */}
          <p className="filter-sub my-2">من:</p>
          <input
            value={localFrom}
            onChange={priceFromUpdate}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>

        {/* Price To */}
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            value={localTo}
            onChange={priceToUpdate}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
      </Row>
    </div>
  );
};

export default SideFilter;
