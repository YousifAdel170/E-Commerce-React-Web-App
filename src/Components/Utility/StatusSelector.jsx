/* eslint-disable react/prop-types */

import { Col } from "react-bootstrap";

const StatusSelector = ({ id, name, data, onChange, disabled, value }) => {
  return (
    <Col xs="12" md="6" className="d-flex flex-column align-items-center mt-2">
      <label htmlFor={id} className="cat-title mb-1">
        {data?.title}
      </label>
      <select
        name={name}
        id={id}
        onChange={onChange}
        className="select text-center w-100"
        aria-label={data?.ariaLabel}
        disabled={disabled}
        value={value}
      >
        <option value="0">{data?.title}</option>
        {data?.status?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </Col>
  );
};

export default StatusSelector;
