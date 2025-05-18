/* eslint-disable react/prop-types */

// Import Custom Style
import "./InputField.css";

// Component responsible for rendering an input field with validation and error handling
const InputField = ({
  value,
  onChangeInputType,
  placeholder,
  type = "text",
  onChangeInput,
  className = "",
  error,
  required = false,
  disabled = false,
}) => {
  // Determine if the input field has an error and set the class accordingly
  const inputClass = error ? "is-invalid" : "";
  return (
    <div className="input-wrapper mx-auto">
      {/* Input Field */}
      <input
        value={value}
        onChange={(e) => onChangeInput(e, onChangeInputType)}
        placeholder={placeholder}
        type={type}
        className={`user-input text-center  ${inputClass} ${className}`}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
      />

      {/* Error Message */}
      {error && (
        <div className="text-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
