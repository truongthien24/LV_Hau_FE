import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import React from "react";
import Menu from "../Menu/Menu";
import Caterory from "../Category/Caterory";
import Cart from "../Cart";
import Favourite from "../Favourite";
import { UserLogin } from "../UserLogin";
import { ChangeLanguage } from "../ChangeLanguage";
import FormSearch from "../FormSearch";
import { useNavigate } from "react-router-dom";

const NavbarDesktop = (props) => {
  const { setIsProfile } = props;

  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="absolute top-0 left-0 z-[99] w-full bg-transparent px-[10px] md:px-[20px] flex items-center flex-col">
      <div className="w-full xl:w-[90%] 2xl:w-[70%] flex items-center justify-between">
        <div className="flex items-center w-[70%]">
          <div className="flex items-center mr-[30px] cursor-pointer"  onClick={returnHome}>
            <img
              src="/images/logo.png"
              className="w-[40px] md:w-[70px] lg:w-[80px]"
            />
            <h1 className="text-[20px]">Black&Cat</h1>
          </div>
          <FormSearch />
        </div>
        <div className="w-[30%] flex items-center justify-between">
          <ChangeLanguage />
          <UserLogin setIsProfile={setIsProfile} />
          <div>
            <Favourite styles={{ marginRight: "15px" }} />
            <Cart />
          </div>
        </div>
      </div>
      <div className="w-full xl:w-[90%] 2xl:w-[70%] flex justify-start mt-[10px] items-center">
        <Caterory />
        <Menu />
        <div className="flex items-center h-[45px]">
          <Icon
            name="phone"
            color={COLOR.primaryColor}
            fill={COLOR.primaryColor}
          />
          <span
            style={{
              color: `${COLOR.primaryColor}`,
              fontWeight: "500",
              fontSize: "20px",
              marginLeft: "10px",
              letterSpacing: "2px",
            }}
          >
            0764026183
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
