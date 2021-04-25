import React from "react";

import "./style.css";

function Icon({ iconName, className, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`icon-${iconName} ${className || ""}`}
    ></span>
  );
}

export default Icon;
