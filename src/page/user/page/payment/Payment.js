import { Steps } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoPayment from "./components/InfoPayment";
import MethodPayment from "./components/MethodPayment";
import ConfirmPayment from "./components/ConfirmPayment";
import { COLOR } from "page/user/shareComponent/constant";
import CheckCart from "./components/CheckCart";
import useCreateDonHang from "page/admin/page/donHangManagement/hook/useCreateDonHang";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";

const Payment = () => {
  const { id } = useParams();

  const [paymentStep, setPaymentStep] = useState({
    step: 0,
    status: false,
    data: {
      thanhToan: {
        method: "",
        done: false,
        viThanhToan: "",
      },
      thongTinGioHang: [],
      dieuKhoan: false,
      thongTinGiaoHang: {
        thoiGianNhanHang: {},
        thongTinNguoiNhan: {},
      },
    },
  });
  //Redux Store Lấy giá trị home từ store
  const { userInfo } = useSelector((state) => state.home);

  const { mutate, isLoading } = useCreateDonHang();

  const navigate = useNavigate();

  const renderStepContent = () => {
    switch (paymentStep.step) {
      case 0: {
        return <InfoPayment onStep={setPaymentStep} step={paymentStep} />;
      }
      case 1: {
        return <CheckCart onStep={setPaymentStep} step={paymentStep} />;
      }
      case 2: {
        return <MethodPayment onStep={setPaymentStep} step={paymentStep} />;
      }
      case 3: {
        return <ConfirmPayment onStep={setPaymentStep} step={paymentStep} />;
      }
      default:
        return <></>;
    }
  };

  const changeStep = async (type) => {
    switch (type) {
      case "prev":
        // if (paymentStep.step === 0) {
        //   navigate(`/cart/${userInfo?.gioHang}`);
        // }
        return setPaymentStep((prev) => {
          return {
            ...prev,
            step: prev.step - 1,
            status: false,
            data: {
              dieuKhoan: false,
            },
          };
        });
      case "next":
        if (paymentStep.step == 2) {
          await mutate({
            Data: {
              userId: userInfo?._id,
              gioHangId: userInfo?.gioHang,
              email: userInfo?.email,
              danhSach: paymentStep?.data.thongTinGioHang?.danhSach,
              thongTinGiaoHang: {
                ngayNhanHangDuKien:
                  paymentStep?.data?.thongTinGiaoHang?.ngayNhanHangDuKien,
                thongTinNguoiNhan:
                  paymentStep?.data?.thongTinGiaoHang?.thongTinNguoiNhan,
              },
              thongTinThanhToan: {
                phuongThucThanhToan: paymentStep?.data?.thanhToan.online
                  ? "online"
                  : "Thanh toán khi nhận hàng",
                thanhToan: paymentStep?.data.thanhToan.done,
                viThanhToan: paymentStep?.data?.thanhToan.viThanhToan,
              },
              tongGia: paymentStep?.data?.thongTinGioHang?.tongGia,
            },
            onSuccess: (res) => {
              toast.success(res?.data?.message);
              setPaymentStep((prev) => {
                return {
                  ...prev,
                  step: prev.step + 1,
                  status: false,
                };
              });
            },
            onError: (err) => {
              toast.error(err?.error?.message);
            },
          });
        } else {
          return setPaymentStep((prev) => {
            return {
              ...prev,
              step: prev.step + 1,
              status: false,
            };
          });
        }
      default:
        return;
    }
  };

  useLoadingEffect(isLoading);

  console.log("paymentStep", paymentStep);

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="flex flex-col items-center bg-[#eaeaea] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <h3 className="mb-[30px] text-[20px]">
          {paymentStep.step === 0
            ? "Thông tin nhận hàng"
            : paymentStep.step === 1
            ? "Kiểm tra giỏ hàng"
            : paymentStep.step === 2
            ? "Thanh toán"
            : "Hoàn tất"}
        </h3>
        <div className="w-full">
          <Steps
            items={[
              {
                title: "Verification",
                status: paymentStep.step > 0 ? "finish" : "process",
                icon:
                  paymentStep.step === 0 ? (
                    <LoadingOutlined />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  ),
              },
              {
                title: "Check",
                status:
                  paymentStep.step > 1
                    ? "finish"
                    : paymentStep.step == 1
                    ? "process"
                    : "wait",
                icon:
                  paymentStep.step === 1 ? (
                    <LoadingOutlined />
                  ) : (
                    <SolutionOutlined />
                  ),
              },
              {
                title: "Pay",
                status:
                  paymentStep.step > 2
                    ? "finish"
                    : paymentStep.step == 2
                    ? "process"
                    : "wait",
                icon:
                  paymentStep.step === 2 ? (
                    <LoadingOutlined />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                  ),
              },
              {
                title: "Done",
                status: paymentStep.step === 3 ? "finish" : "wait",
                icon: <SmileOutlined />,
              },
            ]}
          />
          <div className="pt-[30px]">{renderStepContent()}</div>
        </div>
        {paymentStep?.step < 3 ? (
          <div className="w-full flex justify-end mt-[20px]">
            <button
              className="text-[#fff] text-[11px] md:text-[15px] p-[10px] rounded-[5px] flex items-center justify-center mr-[10px]"
              type="submit"
              style={{
                backgroundColor: `${
                  paymentStep?.step > 0 ? COLOR.primaryColor : "gray"
                }`,
              }}
              // style={{
              //   backgroundColor: `${COLOR.primaryColor}`,
              // }}
              disabled={paymentStep?.step == 0}
              onClick={() => changeStep("prev")}
            >
              Trở lại
            </button>
            <button
              className="text-[#fff] text-[11px] md:text-[15px] p-[10px] rounded-[5px] flex items-center justify-center"
              type="submit"
              style={{
                backgroundColor: `${
                  !(paymentStep?.step == 1 && !paymentStep?.data?.dieuKhoan) &&
                  !(
                    paymentStep?.step == 0 &&
                    _.isEmpty(
                      paymentStep?.data?.thongTinGiaoHang?.thongTinNguoiNhan
                    )
                  ) &&
                  !(
                    paymentStep?.step == 2 &&
                    paymentStep?.data?.thanhToan?.method === "online" &&
                    paymentStep?.data?.thanhToan?.done === false
                  ) &&
                  !(paymentStep?.step == 2 && !paymentStep?.data?.thanhToan)
                    ? COLOR.primaryColor
                    : "gray"
                }`,
              }}
              onClick={() => changeStep("next")}
              disabled={
                (paymentStep?.step == 1 && !paymentStep?.data?.dieuKhoan) ||
                (paymentStep?.step == 0 &&
                  _.isEmpty(
                    paymentStep?.data?.thongTinGiaoHang?.thongTinNguoiNhan
                  )) ||
                (paymentStep?.step == 2 &&
                  paymentStep?.data?.thanhToan?.method === "online" &&
                  paymentStep?.data?.thanhToan?.done === false) ||
                (paymentStep?.step == 2 && !paymentStep?.data?.thanhToan)
              }
            >
              Tiếp theo
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Payment;
