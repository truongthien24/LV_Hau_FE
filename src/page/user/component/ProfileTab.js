import React, { useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../assets/icon";
import { Drawer } from "antd";
import toast from "react-hot-toast";
import { setUserInfo } from "redux/action/homeAction";
import { LayoutContext } from "../layout/Layout1";

export const ProfileTab = (props) => {
  // Props
  const { setIsProfile, isProfile } = props;

  const { fetchDataAccount } = useContext(LayoutContext);

  // Somethings
  const ref = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API
  const { userInfo } = useSelector((state) => state.home);

  // Method
  const handleViewProfile = () => {
    navigate("profile");
    setIsProfile(false);
    // toast("Chức năng đang phát triển");
  };

  const onClose = () => {
    setIsProfile(false);
  };

  const handleLogOut = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userLogin");
    await dispatch(setUserInfo({}));
    await fetchDataAccount();
    navigate("/login");
    setIsProfile(false);
  };

  // Return
  return (
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
      placement="right"
      closable={false}
      onClose={onClose}
      className="ant-drawer-mobile"
      open={isProfile}
      key="right"
      width={250}
      footer={
        <div className="flex justify-center items-center text-[gray]">
          @Black&Cat
        </div>
      }
    >
      <div className="bg-white h-full w-full">
        <div
          className="bg-gray-100 rounded-[10px] flex cursor-pointer p-[10px]"
          onClick={handleViewProfile}
        >
          <img
            className="w-[40px] h-[40px] xl:w-[60px] xl:h-[60px] rounded-[50%]"
            src="https://cdn1.vectorstock.com/i/1000x1000/60/20/orange-cat-cartoon-cute-vector-45736020.jpg"
          />
          <div className="ml-[20px] flex flex-col justify-center">
            <span className="text-[14px] text-gray-500 hover:underline">
              {t("seeProfile")}
            </span>
          </div>
        </div>
        <div className="p-[20px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLogOut}
          >
            <Icon name="logOut" />
            <span className="ml-[10px]">{t("logOut")}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
