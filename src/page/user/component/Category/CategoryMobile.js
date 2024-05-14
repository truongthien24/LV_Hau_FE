import { Collapse } from "antd";
import React from "react";
import ListCategory from "./components/ListCategory";
import { COLOR } from "page/user/shareComponent/constant";
import { Icon } from "assets/icon";

const CateroryMobile = () => {
  const items = [
    {
      key: "1",
      label: "MENU",
      children: <div>ee</div>,
    },
    {
      key: "2",
      label: "ALL CATEGORY",
      children: <ListCategory isMobile={true} />,
    },
  ];

  const onChange = (key) => {};

  return (
    <div className="h-[45px]">
      <Collapse
        items={items}
        onChange={onChange}
        style={{
          width: "100%",
          backgroundColor: `${COLOR.primaryColor}`,
          border: "none",
        }}
        defaultActiveKey={["1"]}
        // expandIcon={({ isActive }) =>
        //   isActive ? (
        //     <Icon name="bar" color="#fff" />
        //   ) : (
        //     <Icon name="bar" color="#fff" />
        //   )
        // }
        className="category__mobile"
      />
    </div>
  );
};

export default CateroryMobile;
