import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <Link to={"/admin/all-orders"} style={{ textDecoration: "none" }}>
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            اداره الطلبات
          </div>
        </Link>

        <Link to={"/admin/all-products"} style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اداره المنتجات
          </div>
        </Link>

        <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
          اضف ماركه
        </div>

        <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
          اضف تصنيف
        </div>

        <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
          اضف تصنيف فرعي
        </div>

        <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
          اضف منتج
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
