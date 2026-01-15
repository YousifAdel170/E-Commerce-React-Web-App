// Import layout components
import { Row, Button } from "react-bootstrap";

// Import address card
import UserAddressCard from "./UserAddressCard";

// Routing
import { Link } from "react-router-dom";

// Hooks
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import { useTranslation } from "react-i18next";

// UI Components
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants/routes";
import { ToastContainer } from "react-toastify";

const UserAllAddresses = () => {
  const [addresses, isLoading] = UserAllAddressesHook();
  const { t } = useTranslation("user");

  return (
    <div>
      {/* Title + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="title-text">{t("userAllAdresses.title")}</div>

        <Link to={ROUTES.USER.ADDRESSES.ADD}>
          <Button
            variant="primary"
            size="sm"
            className="fw-bold d-flex align-items-center gap-1"
            title={t("userAllAdresses.addNewAddress")}
          >
            <FontAwesomeIcon icon={faPlus} />
            {t("userAllAdresses.addNewAddress")}
          </Button>
        </Link>
      </div>

      {/* Addresses List */}
      <Row aria-busy={isLoading}>
        {isLoading ? (
          <SpinnerComponent msg={t("common.loading")} />
        ) : addresses?.length > 0 ? (
          addresses.map((address, index) => (
            <UserAddressCard key={index} address={address} />
          ))
        ) : (
          <ItemsNotFound msg={t("userAllAdresses.noAddresses")} />
        )}
      </Row>

      <ToastContainer />
    </div>
  );
};

export default UserAllAddresses;
