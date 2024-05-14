import { Icon } from "assets/icon";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/action/homeAction";

const SearchMobile = () => {
  const [isToggle, setIsToggle] = useState(false);

  const dispatch = useDispatch();

  // Method
  const handleClickToggle = () => {
    // setIsToggle(true);
    dispatch(
      setLoading({
        status: "isLoading",
      })
    );

    setTimeout(() => {
      dispatch(
        setLoading({
          status: "done",
        })
      );
      toast.error("Chức năng đang phát triển");
    }, 1000);
  };

  const onClose = () => {
    setIsToggle(false);
  };
  return (
    <div className="flex items-center">
      <input
        className="border-b-[1px] border-[white] w-[200px] bg-transparent border-solid outline-none text-[11px] text-[#fff] p-[5px]"
        placeholder="Điền thông tin bạn cần tìm"
      />
      <button
        className="h-[35px] w-[35px] flex items-center justify-center"
        onClick={handleClickToggle}
      >
        <Icon name="search" color="#fff" />
      </button>
    </div>
  );
};

export default SearchMobile;
