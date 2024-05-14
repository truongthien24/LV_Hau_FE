import React from "react";

const ReviewInfoItem = ({ data, title }) => {
  return (
    <div className="flex items-center shadow-md mb-[10px] p-[5px]">
      <div className="flex items-center text-[gray]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
          />
        </svg>
        <span className="ml-[5px] text-[13px]">{title}:</span>
      </div>
      <p className="ml-[7px]">{data}</p>
    </div>
  );
};

export default ReviewInfoItem;
