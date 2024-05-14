import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useGetDetailBook from "page/admin/page/RoomManagement/hook/useGetDetailBook";
import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewInfoItem from "page/user/component/AreaBook/modal/components/ReviewInfoItem";
import { COLOR, COLOR1 } from "page/user/shareComponent/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { Tabs } from "antd";
import { Empty } from "antd";
import _ from "lodash";
import { checkLogin } from "page/user/shareComponent/Function/checkLogin";
import { useSelector } from "react-redux";
import useUpdateGioHang from "page/admin/page/GioHangManagement/hook/useUpdateGioHang";
import { getPercentRent } from "method/getPercentRent";
import useGetDataDanhGia from "page/admin/page/danhGiaManagement/hook/useGetDataDanhGia";
import FormReaction from "./components/FormReaction";
import useGetDataDanhGiaByIdSanPham from "page/admin/page/danhGiaManagement/hook/useGetDataDanhGiaByIDSanPham";
import useCreateDanhGia from "page/admin/page/danhGiaManagement/hook/useCreateDanhGia";
import { Reaction } from "page/user/component/Reaction";
import { useState } from "react";
import ModalRules from "./modal/ModalRules";
import RelatedList from "./components/RelatedList";
import useFindDataBook from "page/admin/page/RoomManagement/hook/useFindBook";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";
import { LayoutContext } from "page/user/layout/Layout1";

const InfoBook = () => {
  const { id } = useParams();

  //useSelector lấy trong kho redux
  const { userInfo } = useSelector((state) => state.home);
  const [openRules, setOnOpenRules] = useState(false);
  const onRules = () => {
    setOnOpenRules((prev) => !prev);
  };
  const { fetchDataAccount } = useContext(LayoutContext);

  // const { danhGiaData, isDataLoading, fetchData, isFetching } =
  //   useGetDataDanhGia(id);

  const {
    danhGiaDataDetail,
    isDataDetailLoading: isLoadingDanhGia,
    fetchData: fetchDanhGia,
    isFetching: isFetchingDanhGia,
  } = useGetDataDanhGiaByIdSanPham("0", "0", { idSanPham: id });

  const {
    gioHangDataDetail,
    isDataDetailLoading: isGioHangLoading,
    fetchData,
    isFetching,
  } = useGetDetailGioHang("0", "0", userInfo?.gioHang);

  // console.log("danhGiaDataDetail", danhGiaDataDetail);

  const { mutate, isLoading } = useUpdateGioHang();

  const { mutate: createDanhGia, isLoading: isLoadingCreateDanhGia } =
    useCreateDanhGia();

  const {
    sachDataDetail,
    isDataDetailLoading,
    fetchData: fetchDetail,
    isFetching: isFetchingDetail,
  } = useGetDetailBook("0", "0", id);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      soLuong: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        soLuong: yup
          .number()
          .required("Please input")
          .min(1, "Số lượng phải lớn hơn 0")
          .max(
            5,
            "Không được thuê quá 5 cuốn sách. Liên hệ:xxx để được tư vấn "
          ),
      })
    ),
  });

  useEffect(() => {
    if (sachDataDetail) {
      reset({ ...sachDataDetail, soLuong: 1 });
    }
  }, [sachDataDetail]);

  const addToCart = async (data) => {
    if (checkLogin()) {
      if (data?.soLuong > sachDataDetail.soLuong) {
        toast.error(
          `Số lượng không đủ. Chỉ còn ${sachDataDetail.soLuong} quyển :((`
        );
      } else {
        await mutate({
          Data: {
            id: userInfo?.gioHang,
            sach: {
              idSach: sachDataDetail?._id,
              soLuong: data?.soLuong,
              soNgayThue: gioHangDataDetail?.danhSach?.length > 0 ? gioHangDataDetail?.danhSach[0]?.soNgayThue : 7,
              giaThue: getPercentRent(gioHangDataDetail?.danhSach?.length > 0 ? gioHangDataDetail?.danhSach[0]?.soNgayThue : 7) * sachDataDetail?.gia,
              tienCoc: sachDataDetail?.gia,
            },
            insert: true,
          },
          onSuccess: async (res) => {
            // await fetchDataAccount();
            // window.location.reload();
            navigate(`/cart/${userInfo?.gioHang}`);
          },
          onError: (err) => {
            toast.error(err?.error?.message);
          },
        });
        // navigate(`/cart/123`);
      }
    } else {
      toast.error("Bạn chưa đăng nhập");
      navigate(`/login`);
    }
  };

  const handleChangeQuantity = (type) => {
    let soLuong = getValues("soLuong");
    switch (type) {
      case "plus":
        return setValue("soLuong", ++soLuong);
      case "minas":
        return setValue("soLuong", --soLuong);
      default:
        return;
    }
  };

  // const addToFavourite = () => {
  //   // Check login
  //   if (checkLogin()) {
  //     toast.error("Bạn chưa đăng nhập");
  //   }
  // };
  const handleDanhGia = async (data, reset) => {
    if (checkLogin()) {
      await createDanhGia({
        Data: {
          idTaiKhoan: userInfo?._id,
          idSach: sachDataDetail?._id,
          noiDung: data?.noiDung,
          soSao: 5,
          ...(data?.idDanhGiaFather && {
            idDanhGiaFather: data?.idDanhGiaFather,
          }),
        },
        onSuccess: async (res) => {
          await fetchDanhGia();
          await reset();
          toast.success(res?.data?.message);
        },
        onError: (err) => {
          toast.error(err?.error?.message);
        },
      });
    } else {
      toast.error("Bạn chưa đăng nhập");
      navigate(`/login`);
    }
  };

  const items = [
    {
      key: "1",
      label: "Nội dung sách",
      children: !_.isEmpty(sachDataDetail?.noiDung) ? (
        <div>{sachDataDetail?.noiDung}</div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
    {
      key: "2",
      label: "Đánh giá",
      children: (
        <div className="grid grid-cols-1 gap-[10px]">
          {!_.isEmpty(danhGiaDataDetail) ? (
            <div className="grid grid-cols-1 gap-[10px] md:gap-[15px]">
              {danhGiaDataDetail?.map((danhGia, index) => {
                return (
                  // <div className="flex">
                  //   <img
                  //     className="w-[40px] h-[40px] rounded-[50%]"
                  //     src="https://cdn1.vectorstock.com/i/1000x1000/60/20/orange-cat-cartoon-cute-vector-45736020.jpg"
                  //   />
                  //   <div className="ml-[10px]">
                  //     <div className="flex item-center">
                  //       <h5 className="font-[500] mr-[10px]">
                  //         {danhGia?.idTaiKhoan?.email}
                  //       </h5>
                  //       <span>
                  //         {new Date(danhGia?.ngayTao)?.toLocaleDateString(
                  //           "en-GB"
                  //         )}
                  //       </span>
                  //     </div>
                  //     <p>{danhGia?.noiDung}</p>
                  //   </div>
                  // </div>
                  <Reaction
                    data={danhGia}
                    key={index}
                    onSubmitReply={handleDanhGia}
                    fetcher={fetchDanhGia}
                  />
                );
              })}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Chưa có đánh giá nào"
            />
          )}
          <div>
            <FormReaction fetch={fetchDanhGia} onSubmit={handleDanhGia} />
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  useLoadingEffect(
    isDataDetailLoading ||
      isLoading ||
      isLoadingDanhGia ||
      isLoadingCreateDanhGia
  );

  const checkExitsOrMaxCart = useMemo(() => {
    return (
      // kiểm tra giỏ hàng hiện tại
      gioHangDataDetail?.danhSach?.findIndex(
        (item) => item?.sach?._id === sachDataDetail._id
      ) != -1 || gioHangDataDetail?.danhSach?.length == 10
    );
  }, [gioHangDataDetail]);

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex flex-col items-center justify-center">
      <div className="flex flex-col bg-[#eaeaea] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <form
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-[30px]"
          onSubmit={handleSubmit(addToCart)}
        >
          <img
            src={sachDataDetail?.hinhAnh?.url}
            className="lg:col-span-2 h-full"
          />
          <div className="lg:col-span-3  flex flex-col">
            <h2 className="">{sachDataDetail?.tenSach}</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px]">
                  Tác giả:{" "}
                  <span className="text-[#000]">
                    <span
                      className="cursor-pointer font-[500]"
                      onClick={onRules}
                      style={{ color: `${COLOR1.secondaryColor}` }}
                    >
                      {sachDataDetail?.tenTacGia}
                    </span>
                  </span>
                </p>
              </div>
              <span className="mx-[10px]">|</span>
              <div className="flex items-center">
                <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px">
                  Tình trạng:{" "}
                  <span className="text-[#000]">
                    {sachDataDetail?.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              Chỉ với
              <span
                className="text-[white] p-[5px] rounded-[5px] inline-block mx-[5px]"
                style={{ backgroundColor: `${COLOR.primaryColor}` }}
              >
                {(
                  (sachDataDetail?.maGiamGia
                    ? sachDataDetail?.gia -
                      (sachDataDetail?.gia * sachDataDetail?.phanTramGiamGia) /
                        100
                    : sachDataDetail?.gia) * 0.1
                )?.toLocaleString()}
              </span>
              / tuần
            </div>
            <div className="my-[20px] ml-[5px] flex items-center">
              <div
                className="text-[white] py-[5px] px-[12px] max-w-fit"
                style={{
                  backgroundColor: `${COLOR.secondaryColor}`,
                  transform: "skew(10deg)",
                }}
              >
                <span
                  className="inline-block text-[18px] md:text-[22px] text-bold"
                  style={{ transform: "skew(-10deg)" }}
                >
                  {/* {sachDataDetail?.gia?.toLocaleString()}đ */}
                  {sachDataDetail?.maGiamGia
                    ? (
                        sachDataDetail?.gia -
                        (sachDataDetail?.gia *
                          sachDataDetail?.phanTramGiamGia) /
                          100
                      )?.toLocaleString()
                    : sachDataDetail?.gia?.toLocaleString()}{" "}
                  VND
                </span>
              </div>
              <div className="ml-[30px]">
                <p className="leading-[20px] text-[13px] md:text-[15px] lg:text-[17px] h-[20px]">
                  {sachDataDetail?.maGiamGia ? (
                    <>
                      <span className="text-[gray] line-through mr-[10px]">
                        {sachDataDetail?.gia?.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <ReviewInfoItem
                title="Nhà cung cấp"
                data={sachDataDetail?.tenNhaCungCap}
              />
              <ReviewInfoItem
                title="Thể loại"
                data={sachDataDetail?.tenTheLoai}
              />
              <ReviewInfoItem
                title="Ngôn ngữ"
                data={sachDataDetail?.tenNgonNgu}
              />
              <ReviewInfoItem
                title="Nhà xuất bản"
                data={sachDataDetail?.tenNhaXuatBan}
              />
              <ReviewInfoItem
                title="Năm xuất bản"
                data={new Date(sachDataDetail?.namXuatBan).getFullYear()}
              />
              <ReviewInfoItem title="Số trang" data={sachDataDetail?.soTrang} />
              <ReviewInfoItem
                title="Kích thước"
                data={sachDataDetail?.kichThuoc}
              />
              <ReviewInfoItem title="Bìa sách" data={sachDataDetail?.biaSach} />
            </div>
            <div>
              <div className="flex items-center my-[10px]">
                <h5
                  style={{
                    color: `${COLOR.primaryColor}`,
                    marginRight: "10px",
                  }}
                >
                  Số lượng
                </h5>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-[#dcdbdb] w-[35px] h-[35px] flex items-center justify-center"
                    onClick={() => handleChangeQuantity("minas")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <input
                    className="bg-[white] w-[35px] h-[35px] text-center"
                    {...register("soLuong")}
                    onError={errors["soLuong"]}
                  />
                  <button
                    type="button"
                    className="bg-[#dcdbdb] w-[35px] h-[35px] flex items-center justify-center"
                    onClick={() => handleChangeQuantity("plus")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </button>
                </div>
                {errors["soLuong"] && (
                  <span className="text-[red] ml-[10px] text-[10px]">
                    {errors["soLuong"].message}
                  </span>
                )}
              </div>
              <button
                disabled={
                  checkLogin() &&
                  (sachDataDetail?.soLuong < 1 || checkExitsOrMaxCart)
                }
                className="text-[#fff] w-full p-[10px] rounded-[5px] flex items-center justify-center"
                style={{
                  backgroundColor: `${
                    !checkLogin()
                      ? COLOR.primaryColor
                      : !checkExitsOrMaxCart && sachDataDetail?.soLuong > 0
                      ? COLOR.primaryColor
                      : "gray"
                  }`,
                }}
              >
                {!checkLogin()
                  ? "Thêm vào giỏ hàng"
                  : checkExitsOrMaxCart
                  ? gioHangDataDetail?.danhSach?.length == 10
                    ? "Giỏ hàng đã đầy"
                    : "Sản phẩm đã có trong giỏ hàng"
                  : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>
        </form>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="mt-[20px]"
        />
        {/* Danh sach liên quan */}
        <ModalRules
          open={openRules}
          onOpen={onRules}
          title="Chi tiết tác giả"
          data={sachDataDetail}
        />
      </div>
      <div className="w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <RelatedList data={sachDataDetail} />
      </div>
    </div>
  );
};

export default InfoBook;
