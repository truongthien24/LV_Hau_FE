import React, { useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CartItem from "./components/CartItem";
import CardHead from "./components/CardHead";
import { columns } from "./helper";
import { COLOR } from "page/user/shareComponent/constant";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "page/user/layout/Layout1";
import { jwtDecode } from "jwt-decode";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";
import { Button, Empty, Tooltip } from "antd";
import useCheckSanPham from "page/admin/page/GioHangManagement/hook/useCheckSanPham";
import { toast } from "react-hot-toast";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { SaveOutlined, CloseOutlined, EditFilled } from "@ant-design/icons";
import { Confirm } from "component/Confirm/Confirm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateGioHang from "page/admin/page/GioHangManagement/hook/useUpdateGioHang";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";

const Cart = () => {
  const navigate = useNavigate();

  const isMobile = useContext(LayoutContext);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  // const { userInfo } = useSelector((state) => state.home);
  const jwt = localStorage.getItem("jwt");

  const userInfo = useMemo(() => {
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      return jwtDC?.users;
    }
  }, [jwt]);

  const { gioHangDataDetail, isDataDetailLoading, fetchData, isFetching } =
    useGetDetailGioHang("0", "0", userInfo?.gioHang);

  const { mutate, isLoading } = useCheckSanPham();

  const { mutate: mutateUpdateGioHang, isLoadig: isLoadingUpdateGioHang } =
    useUpdateGioHang();

  useEffect(() => {
    fetchData();
  }, []);

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      gioHang: {
        giaThue: 0,
      },
    },
  });

  useEffect(()=> {
    if(gioHangDataDetail) {
      const newGioHang = gioHangDataDetail?.danhSach.map((item) => {
        return {...item, soNgayThue: gioHangDataDetail?.danhSach[0]?.soNgayThue};
      })
    }
  }, [gioHangDataDetail])

  const { handleSubmit, watch, reset } = method;

  useEffect(() => {
    if (gioHangDataDetail) {
      reset({ ...gioHangDataDetail });
    }
  }, [gioHangDataDetail]);

  const renderCartItem = () => {
    const danhSach = watch("danhSach");
    if (danhSach?.length > 0) {
      return danhSach?.map((cart, index) => {
        return (
          // truyền bằng props
          <CartItem
            arrayData={danhSach}
            data={cart}
            key={index}
            columns={columns(isMobile, isEdit)}
            isEdit={isEdit}
            gioHang={userInfo?.gioHang}
          />
        );
      });
    } else {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Chưa có sản phẩm nào"
        />
      );
    }
  };

  const handleSubmitCart = async (data) => {
    await mutate({
      Data: gioHangDataDetail,
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        setTimeout(() => {
          navigate(`/payment`);
        }, 1000);
      },
      onError: (err) => {
        toast.error(err.error?.message);
      },
    });
  };

  const handleCancel = async () => {
    await dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          await reset({ ...gioHangDataDetail });
          setIsEdit((prev) => {
            return !prev;
          });
          await dispatch(
            setConfirm({
              status: "close",
              method: () => { },
            })
          );
        },
      })
    );
  };

  useLoadingEffect(isLoading || isDataDetailLoading || isLoadingUpdateGioHang);

  console.log('watch("danhSach")', watch("danhSach"))

  return (
    <>
      <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
        <FormProvider {...method}>
          <form
            className="bg-[#eaeaea] min-h-[calc(100%_-_150px)] px-[10px] py-[10px] md:px-[25px] md:py-[20px] w-full xl:w-[90%] 2xl:w-[70%] relative"
            onSubmit={handleSubmit(handleSubmitCart)}
          >
            <div className="mb-[10px] md:mb-[20px] flex justify-between">
              <h2 className="font-[500] md:text-[22px]">Giỏ hàng của bạn</h2>
              <div className="flex items-center">
                {!isEdit ? (
                  <Tooltip title="Chỉnh sửa">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<EditFilled />}
                      onClick={() => {
                        setIsEdit((prev) => {
                          return !prev;
                        });
                      }}
                    />
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Huỷ bỏ">
                      <Button
                        type="cancel"
                        shape="circle"
                        icon={<CloseOutlined />}
                        onClick={handleCancel}
                      />
                    </Tooltip>
                    <Tooltip title="Lưu">
                      <Button
                        type="primary"
                        className="ml-[10px]"
                        shape="circle"
                        icon={<SaveOutlined />}
                        onClick={async () => {
                          // setIsEdit(prev => { return !prev })
                          await mutateUpdateGioHang({
                            Data: {
                              id: userInfo?.gioHang,
                              // watch là lấy dữ liệu trong form
                              sach: watch("danhSach")?.filter((item)=> item.sach != null),
                              insert: false,
                              update: true,
                            },
                            onSuccess: async (res) => {
                              await fetchData();
                              toast.success(res?.data?.message);
                              setIsEdit(false);
                            },
                            onError: (err) => {
                              toast.error(err?.error?.message);
                            },
                          });
                        }}
                      />
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
            <div className="border-solid border-[#498374] border-[1px] w-full px-[10px] py-[10px] md:px-[25px] md:py-[15px] grid grid-cols-1 gap-[15px]">
              <CardHead columns={columns(isMobile, isEdit)} />
              <div className="grid grid-cols-1 gap-[10px] md:gap-[15px]">
                {renderCartItem()}
              </div>
              <div className="flex justify-end items-center">
                <p className="text-[13px] md:text-[15px] flex justify-end mr-[20px]">
                  <span className="mr-[10px]">Tổng tiền phải thanh toán: </span>
                  <span
                    className="text-[500]"
                    style={{ color: `${COLOR.secondaryColor}` }}
                  >
                    {watch("danhSach")
                      ?.reduce(
                        (a, b) =>
                          a +
                          (b?.sach?.maGiamGia ? (b?.sach?.tienCoc - ((b?.sach?.tienCoc * b?.sach?.phanTramGiamGia) / 100)) : b?.sach?.tienCoc)
                          * b?.soLuong +
                          b?.giaThue * b?.soLuong,
                        0
                      )
                      ?.toLocaleString()}{" "}
                    VND
                  </span>
                </p>
                <div className="flex justify-center">
                  <button
                    className="text-[#fff] text-[11px] md:text-[15px] p-[10px] rounded-[5px] flex items-center justify-center"
                    type="submit"
                    disabled={
                      !watch("danhSach")?.length > 0 || isEdit
                      // isEdit chỉnh sửa giỏ hàng
                      //Điều kiện ở đây là !watch('danhSach')?.length > 0 || isEdit, có nghĩa là nút sẽ bị tắt nếu độ dài của  "danhSach" (thường là một mảng) là 0 hoặc biến isEdit có giá true
                    }
                    style={{
                      backgroundColor: `${watch("danhSach")?.length > 0 && !isEdit
                          ? COLOR.primaryColor
                          : "gray"
                        }`,
                      // ?: là cặp if else
                      //watch('danhSach')?.length > 0 && !isEdit là true, màu nền sẽ được thiết lập thành COLOR.primaryColor, ngược lại nếu là false thì màu nền sẽ là "gray" (màu xám).
                    }}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
            <img
              src="/images/nonnoel.png"
              className="absolute left-[-13px] top-[-15px] w-[50px]"
            />
          </form>
        </FormProvider>
      </div>
      <Confirm />
    </>
  );
};

export default Cart;
