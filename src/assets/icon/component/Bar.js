import React from "react";

const Bar = (props) => {
  const { color, fill, font } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color={`${color ? color : "none"}`}
      fill={`${fill ? fill : "none"}`}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${font === "small" ? "w-4 h-4" : "w-6 h-6"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );
};

export default Bar;
