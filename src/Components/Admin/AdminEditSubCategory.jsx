import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminEditSubCategoryHook from "../../hooks/subCategory/AdminEditSubCategoryHook";

const AdminEditSubCategory = () => {
  const { id } = useParams();
  const [subcategoryName, onChangeName, handleSubmit] =
    AdminEditSubCategoryHook(id);

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">تعديل التصنيف الفرعي</div>
        <Col sm="8">
          <div>
            <input
              type="text"
              onChange={onChangeName}
              value={subcategoryName}
              className="input-form d-block mt-3 px-3"
              placeholder="اسم التصنيف الفرعي"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            حفظ التعديل
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};
export default AdminEditSubCategory;
