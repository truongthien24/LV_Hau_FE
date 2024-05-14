import { Modal, QRCode } from "antd";
import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import usePayment from "../hook/usePayment";
import ModalPayment from "./modals/ModalPayment";
import { useSelector } from "react-redux";

const MethodPayment = ({ onStep, step }) => {
  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      methodPayment: null,
    },
  });

  const {
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = method;

  const { mutate, isLoading } = usePayment();

  const { userInfo } = useSelector((state) => state.home);

  const [popupPayment, onPopupPayment] = useState({
    open: false,
    method: null,
  });

  const [qrPayment, setQrPayment] = useState(null);

  const onOpenPopupPayment = () => {
    onPopupPayment({
      open: !popupPayment.open,
      method: null,
    });
  };

  const submitData = (data) => {};

  const payment = async (type) => {
    switch (type) {
      case "momo": {
        onStep((prev) => {
          return {
            ...prev,
            data: {
              thongTinGiaoHang: prev.data.thongTinGiaoHang,
              thanhToan: {
                online: true,
                done: true,
                viThanhToan: "momo",
              },
              thongTinGioHang: prev.data.thongTinGioHang,
              dieuKhoan: prev.data.dieuKhoan,
            },
          };
        });
        await mutate({
          Data: {
            tongTien: step?.data?.thongTinGioHang?.tongGia
              ? step?.data?.thongTinGioHang?.tongGia
              : 1000,
          },
          onSuccess: (res) => {
            setQrPayment(res?.data?.data);
            onPopupPayment({
              open: true,
              method: "momo",
            });
          },
          onError: (err) => {
            toast.error(err?.error?.message);
          },
        });
        break;
      }

      case "zalopay":
        return toast("Chưa hỗ trợ phương thức thanh toán này");
    }
  };

  return (
    <FormProvider {...method}>
      <form
        className="grid grid-cols-3 gap-[10px] h-full"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="rounded-[10px] col-span-1 shadow-md p-[10px]">
          <h3>Chọn phương thức thanh toán</h3>
          <div className="w-full mt-[20px] grid grid-cols-1 gap-[10px]">
            <>
              <label
                htmlFor={`methodPayment1`}
                className="w-full px-[10px] py-[7px] rounded-[10px] cursor-pointer border-solid border-[1px]"
                style={{
                  borderColor: `${
                    userInfo?.baoXau
                      ? "#4343434a"
                      : watch("methodPayment") == 0
                      ? COLOR.primaryColor
                      : ""
                  }`,
                  backgroundColor: `${
                    userInfo?.baoXau
                      ? "#4343434a"
                      : watch("methodPayment") == 0
                      ? "#66b5a14a"
                      : ""
                  }`,
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              >
                <div className="flex justify-between">
                  <div className="text-[13px] flex">
                    <Icon
                      name="location"
                      font="small"
                      color={COLOR.primaryColor}
                    />
                    <span className="ml-[5px]">Thanh toán khi nhận hàng</span>
                  </div>
                </div>
              </label>
              <input
                type="radio"
                id={`methodPayment1`}
                hidden
                name="methodPayment"
                value={0}
                disabled={userInfo?.baoXau}
                onChange={() => {
                  setValue("methodPayment", 0);
                  onStep((prev) => {
                    return {
                      ...prev,
                      data: {
                        thongTinGioHang: prev.data.thongTinGioHang,
                        dieuKhoan: prev.data.dieuKhoan,
                        thongTinGiaoHang: prev.data.thongTinGiaoHang,
                        thanhToan: {
                          online: false,
                          done: false,
                          viThanhToan: "",
                        },
                      },
                    };
                  });
                }}
              />
            </>
            <>
              <label
                htmlFor={`methodPayment2`}
                className="w-full px-[10px] py-[7px] rounded-[10px] cursor-pointer border-solid border-[1px]"
                style={{
                  borderColor: `${
                    watch("methodPayment") == 1 ? COLOR.primaryColor : ""
                  }`,
                  backgroundColor: `${
                    watch("methodPayment") == 1 ? "#66b5a14a" : ""
                  }`,
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              >
                <div className="flex justify-between">
                  <div className="text-[13px] flex">
                    <Icon
                      name="location"
                      font="small"
                      color={COLOR.primaryColor}
                    />
                    <span className="ml-[5px]">Thanh toán online</span>
                  </div>
                </div>
              </label>
              <input
                type="radio"
                id={`methodPayment2`}
                hidden
                name="methodPayment"
                value={1}
                onChange={() => {
                  setValue("methodPayment", 1);
                  onStep((prev) => {
                    return {
                      ...prev,
                      data: {
                        thongTinGioHang: prev.data.thongTinGioHang,
                        dieuKhoan: prev.data.dieuKhoan,
                        thongTinGiaoHang: prev.data.thongTinGiaoHang,
                        thanhToan: {
                          online: true,
                          done: true,
                          viThanhToan: "",
                        },
                      },
                    };
                  });
                }}
              />
            </>
          </div>
        </div>
        <div className="rounded-[10px] col-span-2 shadow-md p-[10px] h-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {watch("methodPayment") == 1 ? (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-[20px]">
                <button
                  type="button"
                  className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-cover"
                  style={{ backgroundImage: "url('./images/momo.png')" }}
                  onClick={() => {
                    payment("momo");
                  }}
                ></button>
                <button
                  type="button"
                  className="mt-[12px] w-[60px] h-[60px] md:w-[60px] md:h-[60px]  bg-contain"
                  style={{
                    backgroundImage: "url('./images/zalopay.png')",
                    filter: "grayscale(1)",
                  }}
                  onClick={() => {
                    payment("zalopay");
                  }}
                ></button>
              </div>
            ) : (
              <div></div>
            )}
            {/* <div>
              {
                qrPayment
                  ?
                  // <iframe src={qrPayment?.payUrl} width="300" height="150"/>
                  <div className='w-full h-[200px]'>
                    <QRCode
                      errorLevel="H"
                      value={qrPayment?.qrCodeUrl}
                      icon="/images/momo.png"
                    />
                  </div>
                  :
                  ""
              }
            </div> */}
          </div>
        </div>
      </form>
      <ModalPayment
        open={popupPayment?.open}
        onOpen={onOpenPopupPayment}
        data={qrPayment}
      />
    </FormProvider>
  );
};

export default MethodPayment;
