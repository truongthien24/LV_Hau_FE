import { Confirm } from "component/Confirm/Confirm";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import { CellModal } from "page/admin/shareComponent/modal/CellModal";
import { TableMain } from "page/admin/shareComponent/table/TableMain";
import { Reaction } from "page/user/component/Reaction";
import PopupMain from "page/user/shareComponent/Popup/PopupMain";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
// import Details from "./component/Details";
import { columns } from "./helper";
import useDeleteDanhGia from "./hook/useDeleteDanhGia";
import useCreateDanhGia from "./hook/useCreateDanhGia";
import useGetDataTaiKhoan from "./hook/useGetDataTaiKhoan";
import useGetAccountByID from "./hook/useGetAccountByID";
import Details from "./component/Details";
// import useGetDataNhaXuatBan from "./hook/useGetDataNhaXuatBan";
// import useGetDetailNhaXuatBan from "./hook/useGetDetailNhaXuatBan";
// import useDeleteNhaXuatBan from "./hook/useDeleteNhaXuatBan";

const TaiKhoanManagement = () => {
  // State
  const [showSlice, onShowSlice] = useState({ open: false, initData: {} });

  const [isOpenNoiDungDanhGia, setIsOpenNoiDungDanhGia] = useState({
    open: false,
    selector: {},
  });

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onOpenNoiDungDanhGia = (state) => {
    setIsOpenNoiDungDanhGia(state);
  };

  // Get Data
  const { taiKhoanData, isDataLoading, fetchData, isFetching } =
    useGetDataTaiKhoan("0", "0");


  const {
    accountData,
    isDataLoading: isDataDetailLoading,
    fetchData: fetchDataDetail,
    isFetching: isFetchDetail,
  } = useGetAccountByID({id: showSlice?.initData?._id});

  const columnsTable = useMemo(() => {
    return columns(onOpenNoiDungDanhGia);
  }, []);

  const { mutate: mutateDelete, isLoading: isSubmittingDelete } =
    useDeleteDanhGia();

  const { mutate: createDanhGia, isLoading: isLoadingCreateDanhGia } =
    useCreateDanhGia();

  const { userInfo } = useSelector((state) => state.home);

  // Method
  const handleAdd = () => {
    onShowSlice({
      open: true,
      initData: null,
    });
  };

  const handleEdit = (data) => {
    onShowSlice({
      open: true,
      initData: data,
    });
  };

  // const handleDelete = async (data) => {
  //   await dispatch(
  //     setConfirm({
  //       status: "open",
  //       method: async () => {
  //         await mutateDelete({
  //           Data: { _id: data?._id },
  //           onSuccess: async (res) => {
  //             toast.success(res?.data?.message);
  //             fetchData();
  //             dispatch(
  //               setConfirm({
  //                 status: "close",
  //                 method: () => {},
  //               })
  //             );
  //           },
  //           onError: async (error) => {
  //             toast.error(error?.message);
  //           },
  //         });
  //       },
  //     })
  //   );
  // };

  const handleReply = async (data) => {
    const selectorData = isOpenNoiDungDanhGia?.selector;
    await createDanhGia({
      Data: {
        idTaiKhoan: userInfo?._id,
        idSach: selectorData.idSach?._id,
        noiDung: data?.noiDung,
        soSao: 5,
        ...(selectorData?.idDanhGiaFather && {
          idDanhGiaFather: selectorData?.idDanhGiaFather,
        }),
        admin: true,
      },
      onSuccess: async (res) => {
        await fetchData();
        toast.success(res?.data?.message);
        onOpenNoiDungDanhGia({
          open: false,
          selector: null,
        });
      },
      onError: (err) => {
        toast.error(err?.Error?.message);
      },
    });
  };

  useLoadingEffect(isDataLoading);

  return (
    <>
      <div className="h-[12%] flex justify-between items-center">
        <h3 className="text-[20px] text-[#3790c7] font-bold">
          {t("Quản lý tài khoản")}
        </h3>
        {/* <button
          className="flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
          type="submit"
          onClick={handleAdd}
        >
          {t("add")}
        </button> */}
      </div>
      <div className="h-[88%]">
        <TableMain
          data={taiKhoanData}
          columns={columnsTable}
          handleEdit={handleEdit}
          // handleDelete={handleDelete}
          allowDel={false}
        />
      </div>
      <PopupMain
        title={
          _.isEmpty(showSlice?.initData?._id) ? "Thêm tài khoản" : "Sửa tài khoản"
        }
        showSlice={showSlice}
        onShowSlice={onShowSlice}
        fullWidth
        children={
          <Details
            data={accountData}
            fetcher={fetchData}
            fetchDetail={fetchDataDetail}
            showSlice={showSlice}
            onShowSlice={onShowSlice}
          />
        }
      />
      <CellModal
        open={isOpenNoiDungDanhGia?.open}
        onCancel={() => {
          onOpenNoiDungDanhGia({
            open: false,
            selector: null,
          });
        }}
        title="Nội dung đánh giá"
        children={
          <Reaction
            data={isOpenNoiDungDanhGia?.selector}
            onSubmitReply={handleReply}
          />
        }
      />
      <Confirm />
    </>
  );
};

export default TaiKhoanManagement;
