import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCategory = (props) => {
  const { data, isMobile } = props;

  const navigate = useNavigate();

  return (
    <div
      className={`cursor-pointer flex items-center ${
        isMobile ? "py-[7px] px-[5px]" : "py-[11px] px-[10px]"
      } hover:bg-[#71c5af45] duration-200`}
      key={data?.key}
      onClick={() => {
        navigate(data?.path);
      }}
    >
      <Icon name="right" color={COLOR.primaryColor} font="small" />
      <span className={`ml-[5px] ${isMobile ? 'text-[11px]' : 'text-[13px]'}`}>{data?.title}</span>
    </div>
  );
};

export default ItemCategory;
