import { Modal } from "antd";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import PopoverReturnOrder from "./components/PopoverReturnOrder";
import { Confirm } from "component/Confirm/Confirm";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
import useUpdateDonHang from "page/admin/page/donHangManagement/hook/useUpdateDonHang";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import moment from "moment";
import { checkDiffDate } from "page/user/shareComponent/Function/checkDiffDate";

const ModalOrderDetail = ({ open, onOpen, title, data, fetcher }) => {
  const [openReturnOrder, setOpenReturnOrder] = useState(false);

  const [contentConfirm, setContentConfirm] = useState({
    diffDate: 0,
    content: "",
  });

  console.log(data);

  const { mutate, isLoading } = useUpdateDonHang();

  const dispatch = useDispatch();

  const hide = () => {
    setOpenReturnOrder(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenReturnOrder(newOpen);
  };

  const ngayDenHan = useMemo(() => {
    if (data?.ngayGiao) {
      let res = new Date(data?.ngayGiao?.toString());
      res.setDate(res.getDate() + data.danhSach[0]?.soNgayThue);
      return res;
    }
  }, [data?.ngayGiao]);

  const returnBook = () => {
    const diffDate = checkDiffDate(ngayDenHan);
    setContentConfirm({
      content: (
        <div>
          Hạn thuê sách còn{" "}
          <span style={{ color: `${COLOR.secondaryColor}` }}>
            {diffDate} ngày
          </span>
          . Bạn đã chắc chắn ?
        </div>
      ),
    });
    dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          // const newDanhSach = [];
          // for (let sachItem of data?.danhSach) {
          //   if (sachItem === sach) {
          //     sachItem.tinhTrang = true;
          //   }
          //   newDanhSach.push(sachItem);
          // }
          await mutate({
            Data: {
              ...data,
              tinhTrang: 3,
              thongTinTraHang: {
                ngayBatDau: new Date().toString(),
                ngayKetThuc: "",
              },
            },
            onSuccess: (res) => {
              toast.success("Thành công. Đơn hàng sẽ được trả trong vài ngày");
              dispatch(
                setConfirm({
                  status: "close",
                  method: () => { },
                })
              );
            },
            onError: (err) => {
              toast.error(err?.error?.message);
            },
          });
        },
      })
    );
  };

  const cancelOrder = async () => {
    setContentConfirm({
      content: <div> Bạn chắc hủy đơn hàng?</div>,
    });
    await dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          await mutate({
            Data: { ...data, tinhTrang: 5 },
            onSuccess: async (res) => {
              toast.success("Bạn đã huỷ đơn hàng thành công");
              fetcher();
              dispatch(
                setConfirm({
                  status: "close",
                  method: () => { },
                })
              );
              onOpen({
                open: false,
              });
            },
            onError: async (error) => {
              toast.error(error?.error?.message);
            },
          });
        },
      })
    );
  };

  useLoadingEffect(isLoading);

  console.log(data);

  const renderListOrder = () => {
    return data?.danhSach?.map((sach, index) => {
      return (
        <div className="grid grid-cols-6 gap-[10px]" key={index}>
          <img
            src={sach?.sach?.hinhAnh?.url}
            className="w-[50px] xl:w-[70px] h-[100px]"
          />
          <p className="col-span-1">Tên sách: {sach?.sach?.tenSach}</p>
          <p>Thuê: {sach?.soNgayThue}ngày</p>
          <p>Tiền thuê: {sach?.giaThue}</p>
          <p>Tiền cọc: {sach?.tienCoc}</p>
          <p>Số lượng: {sach?.soLuong}</p>

          {/* {data?.tinhTrang == 2 && (
            <PopoverReturnOrder
              sach={sach}
              dataMain={data}
              submitReturnBook={returnBook}
            />
          )} */}
        </div>
      );
    });
  };

  return (
    <>
      <Modal
        className="!w-[90%] 2xl:!w-[70%]"
        open={open}
        onCancel={() => {
          onOpen({
            open: false,
          });
        }}
        footer={null}
        title={title}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] p-[10px]">
          <div
            className="rounded-[10px] p-[10px] col-span-2 flex flex-col justify-between h-fit grid grid-cols-1 gap-[10px]"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Mã đơn hàng:{" "}
              </h5>
              <span>{data?.maDonHang}</span>
            </div>
            <div className="flex items-center">
              {data?.tinhTrang == 2 ? (
                <>
                  <h5
                    className="mr-[10px] font-[500]"
                    style={{ color: `${COLOR.primaryColor}` }}
                  >
                    Ngày nhận hàng:{" "}
                  </h5>
                  <span>{moment(data?.ngayGiao)?.format("DD/MM/YYYY")}</span>
                </>
              ) : (
                <>
                  {
                    data?.tinhTrang != 6
                    &&
                    <>
                      <h5
                        className="mr-[10px] font-[500]"
                        style={{ color: `${COLOR.primaryColor}` }}
                      >
                        Ngày giao hàng dự kiến:{" "}
                      </h5>
                      <span>
                        {data?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayBatDau +
                          " - " +
                          data?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayKetThuc}
                      </span>
                    </>
                  }

                </>
              )}
            </div>
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Tên người nhận:{" "}
              </h5>
              <span>
                {data?.thongTinGiaoHang?.thongTinNguoiNhan?.tenNguoiNhan}
              </span>
            </div>
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Số điện thoại:{" "}
              </h5>
              <span>{data?.thongTinGiaoHang?.thongTinNguoiNhan?.sdt}</span>
            </div>
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Địa chỉ:{" "}
              </h5>
              <span>{data?.thongTinGiaoHang?.thongTinNguoiNhan?.diaChi}</span>
            </div>
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Hình thức thanh toán:{" "}
              </h5>
              <span>{data?.thongTinThanhToan?.phuongThucThanhToan}</span>
            </div>
            {data?.tinhTrang <= 2 ? (
              <div className="flex items-center">
                <h5
                  className="mr-[10px] font-[500]"
                  style={{ color: `${COLOR.primaryColor}` }}
                >
                  Tình trạng thanh toán:{" "}
                </h5>
                <span>
                  {data?.thongTinThanhToan?.thanhToan
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className="flex items-center">
              <h5
                className="mr-[10px] font-[500]"
                style={{ color: `${COLOR.primaryColor}` }}
              >
                Tình trạng đơn hàng:{" "}
              </h5>
              <span
                className="mr-[10px] font-[500] text-[15px]"
                style={{ color: `${COLOR.secondaryColor}` }}
              >
                {data?.tinhTrang == 0
                  ? "Đã xác nhận"
                  : data?.tinhTrang == 1
                    ? "Đang giao"
                    : data?.tinhTrang == 2
                      ? "Đã giao"
                      : data?.tinhTrang == 3
                        ? "Đang trả đơn"
                        : "Đã trả đơn"}
              </span>
            </div>
            {data?.tinhTrang == 4 && (
              <div className="flex items-center">
                <h5
                  className="mr-[10px] font-[500]"
                  style={{ color: `${COLOR.primaryColor}` }}
                >
                  Ngày đã trả:{" "}
                </h5>
                <span>
                  {new Date(
                    data?.thongTinTraHang?.ngayKetThuc
                  ).toLocaleDateString()}
                </span>
              </div>
            )}

            {data?.tinhTrang == 3 && (
              <div className="flex items-center">
                <h5
                  className="mr-[10px] font-[500]"
                  style={{ color: `${COLOR.primaryColor}` }}
                >
                  Ngày bắt đầu trả:{" "}
                </h5>
                <span>
                  {new Date(
                    data?.thongTinTraHang?.ngayBatDau
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
            {data?.tinhTrang == 0 && (
              <button
                className="flex justify-center w-full rounded-[10px] px-[20px] py-[10px] text-[white]"
                style={{ backgroundColor: `${COLOR.secondaryColor}` }}
                onClick={cancelOrder}
              >
                Huỷ đơn hàng
              </button>
            )}
            {data?.tinhTrang == 2 && (
              <button
                className="flex justify-center w-full rounded-[10px] px-[20px] py-[10px] text-[white]"
                style={{ backgroundColor: `${COLOR.secondaryColor}` }}
                onClick={returnBook}
              >
                Trả đơn hàng
              </button>
            )}
          </div>
          <div
            className="rounded-[10px] p-[10px] col-span-3 max-h-[80vh] overflow-y-scroll grid grid-cols-1 gap-[10px]"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            {renderListOrder()}
          </div>
        </div>
      </Modal>
      <Confirm content={contentConfirm?.content} />
    </>
  );
};

export default ModalOrderDetail;
