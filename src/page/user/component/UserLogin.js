import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const UserLogin = (props) => {
  const { setIsProfile } = props;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const userLogin = localStorage.getItem("jwt");

  const { userInfo } = useSelector((state) => state.taiKhoan);

  return (
    <div>
      {userLogin ? (
        <div
          className="flex items-center"
          onClick={() => {
            setIsProfile(true);
          }}
        >
          <span
            className="cursor-pointer text-[14px] block md:hidden lg:block"
            // onClick={() => {
            //   localStorage.removeItem("jwt");
            //   navigate('/login')
            //   // window.location.reload();
            // }}
          >
            {/* ĐĂNG XUẤT |
            <span className="text-[#3790c7] ml-[5px]">
              {userInfo?.tenDangNhap}
            </span> */}
            Hello,
          </span>
          <img
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px] rounded-[50%] ml-[10px] object-cover cursor-pointer"
            src="https://cdn1.vectorstock.com/i/1000x1000/60/20/orange-cat-cartoon-cute-vector-45736020.jpg"
          />
        </div>
      ) : (
        <div className="flex items-center">
          <span
            className="cursor-pointer text-[12px]"
            onClick={() => {
              navigate("/login");
            }}
          >
            ĐĂNG NHẬP
          </span>
        </div>
      )}
    </div>
  );
};
