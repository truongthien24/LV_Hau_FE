import { Collapse } from "antd";
import React from "react";
import ListCategory from "./components/ListCategory";
import { COLOR } from "page/user/shareComponent/constant";
import { Icon } from "assets/icon";

const Caterory = () => {
  const items = [
    {
      key: "1",
      label: "Thể loại sách",
      children: <ListCategory />,
    },
  ];

  const onChange = (key) => {};

  return (
    <div className="h-[45px]">
      <Collapse
        items={items}
        onChange={onChange}
        style={{
          width: "250px",
          backgroundColor: `${COLOR.primaryColor}`,
          border: "none",
        }}
        expandIcon={({ isActive }) =>
          isActive ? (
            <Icon name="bar" color="#fff" />
          ) : (
            <Icon name="bar" color="#fff" />
          )
        }
        className="category"
      />
    </div>
  );
};

export default Caterory;
