import React from "react";

export const getPercentRent = (value) => {
  switch (value) {
    case 7:
      return 0.1;
    case 14:
      return 0.15;
    case 30:
      return 0.17;
    default:
      return;
  }
};
