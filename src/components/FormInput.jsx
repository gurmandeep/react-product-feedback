const FormInput = ({ type, name, label, className, value, handleOnChange }) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={className}
          value={value}
          onChange={handleOnChange}
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className={className}
          value={value}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
};

export default FormInput;
