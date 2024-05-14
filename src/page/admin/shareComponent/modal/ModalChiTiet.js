import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const ChiTiet = (props) => {
  // Props
  const { data, onSubmitReply } = props;

  const { t } = useTranslation();
  return <div>{data.chiTietTacGia}</div>;
};
