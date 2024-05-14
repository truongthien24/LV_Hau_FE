import React from "react";

const Right = (props) => {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default Right;
