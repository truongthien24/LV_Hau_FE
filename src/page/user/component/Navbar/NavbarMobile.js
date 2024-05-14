import React from "react";
import { useNavigate } from "react-router-dom";
import { ChangeLanguage } from "../ChangeLanguage";
import { UserLogin } from "../UserLogin";
import Favourite from "../Favourite";
import Cart from "../Cart";
import { MenuMobile } from "../MenuMobile";
import SearchMobile from "../Search/SearchMobile";

const NavbarMobile = (props) => {
  const { setIsProfile } = props;

  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full bg-transparent flex items-center flex-col">
      <div className="w-full xl:w-[90%] 2xl:w-[70%] px-[10px]">
        <div className="flex items-center justify-center w-[100%]">
          <div className="flex items-center mr-[30px]">
            <img
              src="/images/logo.png"
              className="w-[50px] md:w-[70px] lg:w-[80px] cursor-pointer"
              onClick={returnHome}
            />
            <h1 className="text-[20px]">Black&Cat</h1>
          </div>
        </div>
        <div className="mt-[10px] flex items-center justify-center">
          <ChangeLanguage />
          <UserLogin setIsProfile={setIsProfile} />
          <div style={{ marginLeft: "15px" }}>
            <Favourite styles={{ marginRight: "15px" }} />
            <Cart />
          </div>
        </div>
      </div>
      <div className="h-[50px] bg-[#498374] w-full px-[10px] flex justify-between items-center">
        <MenuMobile/>
        <SearchMobile/>
      </div>
    </div>
  );
};

export default NavbarMobile;
