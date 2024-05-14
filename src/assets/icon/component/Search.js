import React from "react";

export const Search = (props) => {
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};
