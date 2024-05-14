import { Button, Popover } from "antd";
import { Confirm } from "component/Confirm/Confirm";
import { checkDiffDate } from "page/user/shareComponent/Function/checkDiffDate";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";

const PopoverReturnOrder = ({ sach, dataMain, submitReturnBook }) => {
  const [openReturnOrder, setOpenReturnOrder] = useState(false);
  const dispatch = useDispatch();

  const hide = () => {
    setOpenReturnOrder(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenReturnOrder(newOpen);
  };

  const ngayDenHan = useMemo(() => {
    if (dataMain?.ngayGiao) {
      let res = new Date(dataMain?.ngayGiao?.toString());
      res.setDate(res.getDate() + sach?.soNgayThue);
      return res;
    }
  }, [dataMain?.ngayGiao]);

  const returnBook = () => {
    const diffDate = checkDiffDate(ngayDenHan);
    if (diffDate > 0) {
      // toast(`Bạn còn ${diffDate} ngày để thuê sách`);
      submitReturnBook(diffDate, sach);
    } else {
      toast("Đợi chút");
    }
  };

  return (
    <>
      <Popover
        content={
          <div>
            <div>
              <span className="font-[500] my-[0px]">Hạn cuối trả hàng:</span>{" "}
              {ngayDenHan?.toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-[500] my-[0px]">Tình trạng:</span> chưa trả
            </div>
            <Button
              style={{
                backgroundColor: `${COLOR.secondaryColor}`,
                color: "white",
                marginTop: "10px",
                width: "100%",
              }}
              onClick={returnBook}
            >
              Xác nhận trả hàng
            </Button>
          </div>
        }
        title="Thông tin trả hàng"
        trigger="click"
        open={openReturnOrder}
        onOpenChange={handleOpenChange}
      >
        <Button
          disabled={sach?.tinhTrang}
          type={
            sach?.tinhTrang ? 'secondary' : 'primary'
          }
        >
          {sach?.tinhTrang ? "Đã trả" : "Trả hàng"}
        </Button>
      </Popover>
    </>
  );
};

export default PopoverReturnOrder;
