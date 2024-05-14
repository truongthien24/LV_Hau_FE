import { COLOR, COLOR1 } from "page/user/shareComponent/constant";
import React, { useState } from "react";
import ReviewInfoItem from "./ReviewInfoItem";
import { FormProvider, useForm } from "react-hook-form";
import ModalRules from "./ModalRules";
import ModalChiTiet from "./ModalChiTiet";

const ReviewContent = ({ data }) => {
  const [openRules, setOnOpenRules] = useState(false);
  const [openRules1, setOnOpenRules1] = useState(false);
  const onRules = () => {
    setOnOpenRules((prev) => !prev);
  };
  const onRules1 = () => {
    setOnOpenRules1((prev) => !prev);
  };
  return (
    <div>
      <h3 className="text-[22px] font-[400] mb-[10px]">{data?.tenSach}</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px]">
            Tác giả:{" "}
            <span className="text-[#000]">
              <span className="text-[#000]">
                <span
                  className="cursor-pointer font-[500]"
                  onClick={onRules1}
                  style={{ color: `${COLOR1.secondaryColor}` }}
                >
                  {data?.tenTacGia}
                </span>
              </span>
            </span>
          </p>
        </div>
        <span className="mx-[10px]">|</span>
        <div className="flex items-center">
          <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px">
            Tình trạng:{" "}
            <span className="text-[#000]">
              {data?.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between my-[20px]">
        <div
          className="text-[white] py-[5px] px-[12px] max-w-fit ml-[5px]"
          style={{
            backgroundColor: `${COLOR.secondaryColor}`,
            transform: "skew(10deg)",
          }}
        >
          {/* <span
            className="inline-block text-[18px] md:text-[22px] text-bold"
            style={{ transform: "skew(-10deg)" }}
          >
            {data?.gia?.toLocaleString()}đ
          </span> */}
          <span
            className="inline-block text-[18px] md:text-[22px] text-bold"
            style={{ transform: "skew(-10deg)" }}
          >
            {/* {sachDataDetail?.gia?.toLocaleString()}đ */}
            {data?.maGiamGia
              ? (
                  data?.gia -
                  (data?.gia * data?.phanTramGiamGia) / 100
                )?.toLocaleString()
              : data?.gia?.toLocaleString()}{" "}
            VND
          </span>
        </div>
        <div className="flex items-center">
          <span
            className="cursor-pointer font-[500]"
            onClick={onRules1}
            style={{ color: `${COLOR1.secondaryColor}` }}
          >
            Thuê chỉ với
          </span>
          <span
            className="text-[white] p-[5px] rounded-[5px] inline-block mx-[5px]"
            style={{ backgroundColor: `${COLOR.primaryColor}` }}
          >
            {(
              (data?.maGiamGia
                ? data?.gia - (data?.gia * data?.phanTramGiamGia) / 100
                : data?.gia) * 0.1
            )?.toLocaleString()}{" "}
          </span>
          / tuần
        </div>
      </div>
      <div className="flex flex-col">
        <ReviewInfoItem title="Nhà cung cấp" data={data?.tenNhaCungCap} />
        <ReviewInfoItem title="Thể loại" data={data?.tenTheLoai} />
        <ReviewInfoItem title="Ngôn ngữ" data={data?.tenNgonNgu} />
        <ReviewInfoItem title="Nhà xuất bản" data={data?.tenNhaXuatBan} />
        <ReviewInfoItem
          title="Năm xuất bản"
          data={new Date(data?.namXuatBan).getFullYear()}
        />
        <ReviewInfoItem title="Số trang" data={data?.soTrang} />
        <ReviewInfoItem title="Kích thước" data={data?.kichThuoc} />
        <ReviewInfoItem title="Bìa sách" data={data?.biaSach} />
        <ReviewInfoItem
          title="Nội dung sách"
          data={
            <span
              className="cursor-pointer font-[500]"
              onClick={onRules}
              style={{ color: `${COLOR.secondaryColor}` }}
            >
              Xem chi tiết
            </span>
          }
        />
      </div>
      <ModalRules
        open={openRules}
        onOpen={onRules}
        title="xem nội dung sách"
        data={data}
      />
      <ModalChiTiet
        open={openRules1}
        onOpen={onRules1}
        title="xem chi tiết tác giả"
        data={data}
      />
    </div>
  );
};

export default ReviewContent;
