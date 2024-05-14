import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { COLOR } from "page/user/shareComponent/constant";
import useGetDataDonHang from "page/admin/page/donHangManagement/hook/useGetDataDonHang";
import _ from "lodash";
import moment from "moment";
import { Empty } from "antd";
import { toast } from "react-hot-toast";
import ModalOrderDetail from "./components/modal/ModalOrderDetail";
import Setting from "./components/Setting";
import ModalHistoryOrder from "./components/modal/ModalHistoryOrder";

export const Profile = () => {
  // State
  const [statusOrder, setStatusOrder] = useState(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [orderDetail, setOrderDetail] = useState({
    open: false,
    selector: null,
  });

  const [orderHistory, setOrderHistory] = useState({
    open: false,
    selector: null,
  });

  // Somethings
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Effect
  useEffect(() => { }, []);

  const { userInfo } = useSelector((state) => state.home);

  const { donHangData, isDataLoading, fetchData, isFetching } =
    useGetDataDonHang("0", "0", userInfo?._id);

  const donHangList = useMemo(() => {
    if (!_.isEmpty(donHangData)) {
      // if (statusOrder == 2) {
      //   return donHangData?.filter((i) => i.tinhTrang == 2);
      // }
      return donHangData?.filter((i) => i.tinhTrang === statusOrder);
    }
    return [];
  }, [donHangData, statusOrder]);

  const onOrderDetail = (onOrder) => {
    setOrderDetail(onOrder);
  };

  const onOrderHistory = (onOrder) => {
    setOrderHistory(onOrder);
  };

  const onStatusOrder = (status) => {
    setStatusOrder(status);
  };

  const renderDonHang = () => {
    if (!_.isEmpty(donHangList)) {
      /// map là xử lý mảng
      return donHangList?.map((donHang, index) => {
        return (
          <div className="grid grid-cols-1 gap-[10px] bg-[#84bcaf4a] p-[10px] rounded-[5px]">
            <div className="flex justify-between text-[13px] xl:text-[14px]">
              <div className="flex items-center">
                <h5 className="mr-[10px]">#{donHang?.maDonHang}</h5>
                <div className="text-[12px] xl:text-[13px] flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-[5px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {donHang?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayBatDau +
                    " - " +
                    donHang?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayKetThuc}
                </div>
              </div>
              <button
                className="text-[12px] lg:text-[13px] font-[600] text-[#f78700]"
                on
                onClick={() => {
                  onOrderDetail({
                    open: true,
                    selector: donHang,
                  });
                }}
              >
                Xem chi tiết
              </button>
            </div>
            <div className="flex items-center text-[12px] xl:text-[13px]">
              <div>
                <strong>
                  Loại sách đang thuê : {donHang?.danhSach?.length}
                </strong>
              </div>
              <div className="ml-[10px]">
                {" "}
                <strong>
                  {" "}
                  Tổng giá: {donHang?.tongGia?.toLocaleString()} VND
                </strong>
              </div>
            </div>
          </div>
        );
        // length để kiểm tra mãng hoặc chuỗi đó có bao nhiêu phần tử
      });
    } else {
      return <Empty description="Chưa có đơn hàng nào" />;
    }
  };

  // Return
  return (
    <>
      <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
        <div className="flex flex-col items-center bg-[#eaeaea] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[15px] py-[20px]">
          <h3 className="mb-[30px] text-[20px]">Thông tin tài khoản</h3>
          <div className="w-full grid lg:grid-cols-6 gap-[10px]">
            <div
              className="rounded-[10px] p-[10px] col-span-2"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <div className="flex items-center justify-between">
                <img
                  className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px] rounded-[50%] ml-[10px] object-cover cursor-pointer"
                  src="https://cdn1.vectorstock.com/i/1000x1000/60/20/orange-cat-cartoon-cute-vector-45736020.jpg"
                />
                <div className="text-[13px] md:text-[14px] text-[#525252]">
                  <div className="flex justify-end">
                    Thành viên:
                    <span className="ml-[5px] text-[#000] font-[500] text-[14px] md:text-[15px]">
                      Sliver
                    </span>
                  </div>
                  <div className="flex justify-end">
                    Điểm:
                    <span
                      className="ml-[5px] font-[500] text-[14px] md:text-[15px]"
                      style={{ color: `${COLOR.secondaryColor}` }}
                    >
                      150
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-[20px]">
                <div className="flex items-center mb-[15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={COLOR.secondaryColor}
                    dataSlot="icon"
                    className="w-5 h-5 mr-[10px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span>Thông tin</span>
                </div>
                <Setting />
              </div>
            </div>
            <div
              className="rounded-[10px] p-[10px] col-span-4 grid grid-cols-1 gap-[30px]"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={COLOR.secondaryColor}
                      className="w-5 h-5 mr-[10px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                      />
                    </svg>
                    <span>Đơn hàng</span>
                  </div>
                  <button
                    className="text-[13px] md:text-[14px] text-[#585858]"
                    onClick={() => {
                      // toast("Chức năng đang phát triển");
                      onOrderHistory({
                        open: true,
                        selector: donHangData?.filter((item) => item.tinhTrang === 4)
                      })
                    }}
                  >
                    Xem lịch sử đơn hàng
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-[10px] mt-[15px]">
                  <button
                    className="flex relative justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] rounded-[10px] py-[5px] px-[10px] duration-300"
                    style={{
                      backgroundColor: `${statusOrder === 0 ? COLOR.primaryColor : "#fff"
                        }`,
                      color: `${statusOrder === 0 ? "#fff" : "#000"}`,
                    }}
                    onClick={() => onStatusOrder(0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="ml-[5px]">Xác nhận</span>
                    <span className="absolute right-[0px] top-[-10px] bg-[#e42e2e] text-[#fff] flex items-center justify-center text-[13px] w-[20px] h-[20px] rounded-[50%]">
                      {
                        (donHangData?.filter(
                          (donHang) => donHang.tinhTrang === 0
                        )).length
                      }
                    </span>
                  </button>
                  <button
                    className="flex relative justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] rounded-[10px] py-[5px] px-[10px] duration-300"
                    style={{
                      backgroundColor: `${statusOrder === 1 ? COLOR.primaryColor : "#fff"
                        }`,
                      color: `${statusOrder === 1 ? "#fff" : "#000"}`,
                    }}
                    onClick={() => onStatusOrder(1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    <span className="ml-[5px]">Đang giao</span>
                    <span className="absolute right-[0px] top-[-10px] bg-[#e42e2e] text-[#fff] flex items-center justify-center text-[13px] w-[20px] h-[20px] rounded-[50%]">
                      {
                        (donHangData?.filter(
                          (donHang) => donHang.tinhTrang === 1
                        )).length
                      }
                    </span>
                  </button>
                  <button
                    className="flex relative justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] rounded-[10px] py-[5px] px-[10px] duration-300"
                    style={{
                      backgroundColor: `${statusOrder === 2 ? COLOR.primaryColor : "#fff"
                        }`,
                      color: `${statusOrder === 2 ? "#fff" : "#000"}`,
                    }}
                    onClick={() => onStatusOrder(2)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <span className="ml-[5px]">Đã giao</span>
                    <span className="absolute right-[0px] top-[-10px] bg-[#e42e2e] text-[#fff] flex items-center justify-center text-[13px] w-[20px] h-[20px] rounded-[50%]">
                      {
                        (donHangData?.filter(
                          (donHang) => donHang.tinhTrang == 2
                        )).length
                      }
                    </span>
                  </button>
                  <button
                    className="flex relative justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] rounded-[10px] py-[5px] px-[10px] duration-300"
                    style={{
                      backgroundColor: `${statusOrder === 3 ? COLOR.primaryColor : "#fff"
                        }`,
                      color: `${statusOrder ===3 ? "#fff" : "#000"}`,
                    }}
                    onClick={() => onStatusOrder(3)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <span className="ml-[5px]">Đang trả</span>
                    <span className="absolute right-[0px] top-[-10px] bg-[#e42e2e] text-[#fff] flex items-center justify-center text-[13px] w-[20px] h-[20px] rounded-[50%]">
                      {
                        (donHangData?.filter(
                          (donHang) => donHang.tinhTrang == 3
                        )).length
                      }
                    </span>
                  </button>
                  <button
                    className="flex relative justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] rounded-[10px] py-[5px] px-[10px] duration-300"
                    style={{
                      backgroundColor: `${statusOrder === 5 ? COLOR.primaryColor : "#fff"
                        }`,
                      color: `${statusOrder === 5  ? "#fff" : "#000"}`,
                    }}
                    onClick={() => onStatusOrder(5)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>

                    <span className="ml-[5px]">Đã huỷ</span>
                    <span className="absolute right-[0px] top-[-10px] bg-[#e42e2e] text-[#fff] flex items-center justify-center text-[13px] w-[20px] h-[20px] rounded-[50%]">
                      {
                        (donHangData?.filter(
                          (donHang) => donHang.tinhTrang == 5
                        )).length
                      }
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-[10px] mt-[15px]">
                  {renderDonHang()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalOrderDetail
        open={orderDetail.open}
        data={orderDetail.selector}
        onOpen={onOrderDetail}
        title="Chi tiết đơn hàng"
        fetcher={fetchData}
      />
      <ModalHistoryOrder open={orderHistory.open} data={orderHistory.selector}
        onOpen={onOrderHistory}
        onOrderDetail={onOrderDetail}
        title="Lich su don hang" />
    </>
  );
};
