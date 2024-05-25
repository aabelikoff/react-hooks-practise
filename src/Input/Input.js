//implements input
import React, { useState } from "react";

export default function Input({
  name,
  type,
  id,
  label,
  labelBefore,
  initialValue,
  classes,
  labelClasses,
  containerClasses,
  placeholder,
  required,
  showRequired,
  disabled,
  checked,
  pattern,
  minLength,
  maxLength,
  onInputChange,
}) {
  const [inputValue, setInputValue] = useState(initialValue instanceof Array ? "" : initialValue || "");
  const [isValid, setIsValid] = useState(true);

  const handleChangeInput = e => {
    const {
      value,
      validity: { valid },
    } = e.target;
    setInputValue(value);
    setIsValid(valid);
  };

  let inputElement =
    type === "select" ? (
      <select name={name} type={type} id={id} className={classes} placeholder={placeholder} required={required} disabled={disabled} onChange={handleChangeInput} value={inputValue}>
        <option disabled={true} value={""}>
          {" "}
          Choose an option:{" "}
        </option>
        {initialValue.map(i => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea name={name} type={type} id={id} className={classes} placeholder={placeholder} required={required} disabled={disabled} onChange={handleChangeInput}>
        {initialValue}
      </textarea>
    ) : (
      <input
        name={name}
        type={type}
        id={id}
        className={isValid ? classes : `${classes} border-danger-subtle border-5 `}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        checked={checked}
        onChange={handleChangeInput}
        value={inputValue}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
      />
    );
  return (
    <>
      <div className={containerClasses || "mb-3 d-flex justify-content-between"}>
        {label && labelBefore && (
          <label htmlFor={id} className={labelClasses || "form-label text-start w-25 mb-0"}>
            {label}
            {required && showRequired && <span style={{ color: "red" }}> *</span>}
          </label>
        )}
        {inputElement}
        {label && !labelBefore && (
          <label htmlFor={id} className={labelClasses || "form-label text-start w-25 mb-0"}>
            {label}
            {required && showRequired && <span style={{ color: "red" }}> *</span>}
          </label>
        )}
      </div>
    </>
  );
}
