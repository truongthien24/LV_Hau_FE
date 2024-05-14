import { Checkbox } from "antd";
import moment from "moment";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";
import { COLOR } from "page/user/shareComponent/constant";
import { getDateShipping } from "page/user/shareComponent/Function/getDateShipping";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import ModalRules from "./modals/ModalRules";

const BookCartItem = ({ book }) => {
  console.log('book', book)
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex">
        <img
          src={book?.sach?.hinhAnh?.url}
          className="w-[50px] h-full mr-[10px]"
        />
        <div className="flex flex-col justify-between">
          <h5
            className="text-[14px] lg:text-[15px]"
            style={{ color: `${COLOR.primaryColor}` }}
          >
            {book?.sach?.tenSach}
          </h5>
          <div className="flex items-center">
            <div>
              <p className="text-[13px]">
                Giá thuê:{" "}
                <span
                  className="inline-block p-[5px] rounded-[5px]"
                  style={{ backgroundColor: `${COLOR.secondaryColor}` }}
                >
                  {parseInt(book?.giaThue).toLocaleString()}
                </span>{" "}
              </p>
            </div>
            <div className="mx-[10px]">
              <p className="text-[13px]">
                Giá cọc:{" "}
                <span
                  className="inline-block p-[5px] rounded-[5px]"
                  style={{ backgroundColor: `${COLOR.secondaryColor}` }}
                >
                  {parseInt(book?.sach?.gia).toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[13px]">SL: {book?.soLuong}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-[12px] md:text-[14px]">
          {/* Thành tiền: <span>{book?.tongTien}</span> */}
          Thành tiền: <span className="font-bold" style={{color: COLOR.secondaryColor}}>{(
                    parseInt(book?.sach?.tienCoc) * parseInt(book?.soLuong) +
                    book.giaThue *
                      parseInt(book?.soLuong)
                  )?.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

const CheckCart = ({ onStep, step }) => {
  const { userInfo } = useSelector((state) => state.home);

  const [openRules, setOnOpenRules] = useState(false);

  const method = useForm({
    mode: "onSubmit",
    defaultValue: {
      maGiamGia: "",
      tenGiamGia: "",
    },
  });

  const { watch, handleSubmit } = method;

  const { gioHangDataDetail, isDataDetailLoading, fetchData, isFetching } =
    useGetDetailGioHang("0", "0", userInfo?.gioHang);

  const handleChooseVoucher = () => {
    toast("Chức năng đang phát triển");
  };

  const onRules = () => {
    setOnOpenRules((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-5 gap-[10px] w-[full]">
      <div className="grid grid-cols-1 gap-[15px] rounded-[10px] col-span-3 shadow-md p-[10px]">
        {gioHangDataDetail?.danhSach?.map((book, index) => {
          return <BookCartItem book={book} key={index} />;
        })}
      </div>
      <FormProvider {...method}>
        <form className="flex flex-col rounded-[10px] col-span-2 shadow-md p-[10px]">
          <div className="w-full bg-[white] rounded-[7px] p-[7px] mb-[7px]">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={COLOR.primaryColor}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span className="text-[12px] md:text-[15px] ml-[7px]">
                Thời gian giao hàng dự kiến
              </span>
            </div>
            <div className="ml-[35px]">
              <span className="text-[11px] md:text-[13px] text-[gray]">
                {getDateShipping(new Date())[0]} -{" "}
                {getDateShipping(new Date())[1]}
              </span>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-between bg-[white] rounded-[7px] p-[7px] mb-[7px]"
              onClick={handleChooseVoucher}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
                <span className="ml-[7px] text-[12px] md:text-[15px]">
                  Voucher
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-[7px] ticket text-[9px] md:text-[11px]">
                  {watch("tenGiamGia")}
                  Miễn phí giao hàng
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-[10px]">
            <div className="flex justify-center bg-[white] rounded-[5px] p-[10px] grid grid-cols-1 gap-[10px] text-[11px] md:text-[13px] text-[gray]">
              <h5 className="text-[15px] text-[#000] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={COLOR.secondaryColor}
                  className="w-5 h-5 mr-[7px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                  />
                </svg>
                <span className="text-[12px] md:text-[15px]">
                  Chi tiết thanh toán
                </span>
              </h5>
              <div className="flex justify-between">
                <span>Tổng tiền hàng</span>
                <span>{gioHangDataDetail?.tongGia?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng tiền phí vận chuyển</span>
                <span>{"30.000"}</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá phí vận chuyển</span>
                <span>{"-30.000"}</span>
              </div>
            </div>
            <div
              className="flex items-start justify-end w-full rounded-[10px] px-[20px] py-[10px] text-[white]"
              style={{ backgroundColor: `${COLOR.primaryColor}` }}
            >
              Tổng tiền thanh toán:
              <span
                className="ml-[10px] font-[500]"
                style={{ color: `${COLOR.secondaryColor}` }}
              >
                {(gioHangDataDetail?.tongGia).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center my-[10px]">
            <Checkbox
              onChange={(e) => {
                onStep((prev) => {
                  return {
                    ...prev,
                    data: {
                      thongTinGioHang: gioHangDataDetail,
                      dieuKhoan: e.target.checked,
                      thongTinGiaoHang: {
                        ngayNhanHangDuKien: {
                          ngayBatDau: getDateShipping(new Date())[0],
                          ngayKetThuc: getDateShipping(new Date())[1],
                        },
                        thongTinNguoiNhan:
                          prev?.data?.thongTinGiaoHang?.thongTinNguoiNhan,
                      },
                    },
                  };
                });
              }}
            />
            <p className="ml-[10px] text-[12px] md:text-[14px]">
              Đồng ý với{" "}
              <span
                className="cursor-pointer font-[500]"
                onClick={onRules}
                style={{ color: `${COLOR.secondaryColor}` }}
              >
                điều khoản
              </span>{" "}
              của Black&Cat.
            </p>
          </div>
        </form>
      </FormProvider>
      <ModalRules
        open={openRules}
        onOpen={onRules}
        title="Điều khoản của chúng tôi"
      />
    </div>
  );
};

export default CheckCart;
