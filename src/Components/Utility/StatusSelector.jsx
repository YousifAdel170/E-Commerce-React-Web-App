/* eslint-disable react/prop-types */

import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./StatusSelector.css"; // Assuming you have a CSS file for styling

const StatusSelector = ({ id, name, data, onChange, disabled, value }) => {
  const { t } = useTranslation("admin"); // Translation function for admin namespace
  return (
    <Col xs="12" md="6" className="d-flex flex-column align-items-center mt-2">
      {/* <label htmlFor={id} className="order-item-text mb-1">
        {t(data?.title)}
      </label> */}
      <select
        name={name}
        id={id}
        onChange={onChange}
        className="select text-center order-item-text-answer w-100"
        aria-label={t(data?.ariaLabel)}
        disabled={disabled}
        value={value}
      >
        <option value="0" className="order-item-text-answer">
          {t(data?.title)}
        </option>
        {data?.status?.map((option, index) => (
          <option
            className="order-item-text-answer"
            key={index}
            value={option.value}
          >
            {t(option.title)}
          </option>
        ))}
      </select>
    </Col>
  );
};

export default StatusSelector;
