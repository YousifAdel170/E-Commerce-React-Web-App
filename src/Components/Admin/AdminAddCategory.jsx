import { Col, Row, Spinner } from "react-bootstrap";

import uploadImage from "../../assets/Imgs/avatar.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewCategory } from "../../redux/actions/categoryAction";

const AdminAddCategory = () => {
  // States [image: new uploaded item  | name: Item name]
  const [image, setImage] = useState(uploadImage);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // Display choosed Image from the Local PC
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0])); // Image
      setSelectedFile(event.target.files[0]); // File
    }
  };

  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // Save The Data into the DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name != "" && selectedFile != null) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", selectedFile);

      if (loading === false) console.log("جاري التحميل");

      setLoading(true);
      setIsPress(true);
      await dispatch(createNewCategory(formData));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading === false) {
      setImage(uploadImage);
      setName("");
      setSelectedFile(null);
      console.log("تم االانتهاء");
      setLoading(true);
      setTimeout(() => {
        setIsPress(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره التصنيف</div>

          <div>
            <label htmlFor="upload-photo">
              <img
                src={image}
                alt="Upload Image"
                height="100px"
                width="120px"
                style={{ cursor: "pointer" }}
              />
            </label>

            <input
              type="file"
              name="photo"
              onChange={onImageChange}
              id="upload-photo"
            />
          </div>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>

      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
    </div>
  );
};

export default AdminAddCategory;
