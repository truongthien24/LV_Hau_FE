import { Icon } from "assets/icon";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../shareComponent/constant";
import { checkLogin } from "../shareComponent/Function/checkLogin";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";
import _ from "lodash";

const Cart = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.home);

  const { gioHangDataDetail, isDataDetailLoading, fetchData, isFetching } =
    useGetDetailGioHang("0", "0", userInfo?.gioHang);

  const handleClick = () => {
    if (checkLogin()) {
      navigate("/cart/1231332132");
    } else {
      toast.error("Rất tiếc! Bạn chưa đăng nhập");
    }
  };

  return (
    <button className="relative" onClick={handleClick}>
      <Icon name="cart" color={COLOR.primaryColor} />
      {!_.isEmpty(userInfo) ? (
        <div className="text-[#fff] p-[2px] min-w-[20px] box-border text-[10px] rounded-[50%] flex items-center justify-center absolute top-0 left-[70%] bg-[#498374]">
          {/* {số lượng giỏ hàng có bao nhiêu sản phẩm} */}
          {gioHangDataDetail?.danhSach?.length}
        </div>
      ) : (
        ""
      )}
    </button>
  );
};

export default Cart;
