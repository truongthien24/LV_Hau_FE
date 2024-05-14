import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../assets/icon";
import { Drawer } from "antd";
import Caterory from "./Category/Caterory";
import CateroryMobile from "./Category/CategoryMobile";

export const MenuMobile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isToggle, setIsToggle] = useState(false);

  // Method
  const handleClickToggle = () => {
    setIsToggle(true);
  };

  const onClose = () => {
    setIsToggle(false);
  };

  // Return
  return (
    <>
      <button
        className="h-[35px] w-[35px] rounded-[5px] border-[1px] border-[#ffffff] flex items-center justify-center"
        onClick={handleClickToggle}
      >
        <Icon name="bar" color="#fff" />
      </button>
      <Drawer
        title={
          <div className="flex items-center mr-[30px]">
            <img
              src="/images/logo.png"
              className="w-[50px] md:w-[70px] lg:w-[80px] cursor-pointer"
            />
            <h1 className="text-[20px]">Black&Cat</h1>
          </div>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        className="ant-drawer-mobile"
        open={isToggle}
        key="left"
        width={250}
        footer={<div className="flex justify-center items-center text-[gray]">@Copyright Steven Thien</div>}
      >
        <CateroryMobile />

      </Drawer>
    </>
  );
};
