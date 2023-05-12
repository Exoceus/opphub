import React, { useState, useEffect } from "react";

function OppFormTextItem({
  value,
  onChange,
  header,
  required,
  placeholder,
  type,
  optionHeading,
}) {
  if (type === "textarea") {
    return (
      <div className="form-group">
        <label className="input-title">
          {header} {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <textarea
          required={required}
          className="form-control"
          rows="7"
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          placeholder={placeholder}
        />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className="form-group">
        <label className="input-title">
          {header} {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <input
          className="form-control"
          type="number"
          required={required}
          value={value}
          min="0"
          onChange={({ target: { value } }) => onChange(value)}
          placeholder={placeholder}
          style={{
            borderRadius: "0.5rem",
            border: "2px solid var(--accent)",
            backgroundColor: "#fff",
            color: "black",
          }}
        />
      </div>
    );
  } else if (type === "date") {
    return (
      <div className="form-group">
        <label className="input-title">
          {header} {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <input
          type="date"
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          required={required}
        />
      </div>
    );
  } else if (type === "checkbox") {
    return (
      <div className="form-group">
        <label className="input-title">
          {header} {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <div>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => {
              onChange(!value);
            }}
            required={required}
          />
          {optionHeading}
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <label className="input-title">
          {header} {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <input
          type="text"
          className="form-control"
          required={required}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default OppFormTextItem;
