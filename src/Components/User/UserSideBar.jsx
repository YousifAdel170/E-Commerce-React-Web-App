/* Importing Link component from react-router-dom for navigation */
import { Link } from "react-router-dom";

const UserSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        {/* Link to all orders page */}
        <Link to="/user/all-orders">
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            اداره الطلبات
          </div>
        </Link>

        {/* Link to favorite products page */}
        <Link to="/user/favorite-products">
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            المنتجات المفضلة
          </div>
        </Link>

        {/* Link to addresses page */}
        <Link to="/user/addresses">
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            العنوانين الشخصية
          </div>
        </Link>

        {/* Link to user profile page */}
        <Link to="/user/profile">
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            الملف الشخصي
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserSideBar;
