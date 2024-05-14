import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Confirm } from "../../../../component/Confirm/Confirm";
import { TableMain } from "../../shareComponent/table/TableMain";
import { useDispatch } from "react-redux";
import { columns } from "./helper";
import { ModalEditBaiViet } from "./component/modal/ModalEditBaiViet";
import { ModalCreateBaiViet } from "./component/modal/ModalCreateBaiViet";
import { ModalEditReaction } from "./component/modal/ModalEditReaction";
import { getCommonCode } from "redux/action/getCommonCode";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { setConfirm } from "redux/action/homeAction";
import toast from "react-hot-toast";
import useGetDetailBaiViet from "./hook/useGetDetailBaiViet";
import useGetDataBaiViet from "./hook/useGetDataBaiViet";
import useDeleteBaiViet from "./hook/useDeleteBaiViet";
import { Alert, Space } from "antd";

export const BaiVietManagement = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalEditReaction, setIsModalEditReaction] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Somethings
  const { t } = useTranslation();
  const dispatch = useDispatch();
 

  // Effect
  // useEffect(async () => {
  //   await dispatch(getCommonCode("tacGia"));
  //   await dispatch(getCommonCode("theLoai"));
  //   await dispatch(getCommonCode("nhaXuatBan"));
  //   await dispatch(getCommonCode("nhaCungCap"));
  //   await dispatch(getCommonCode("ngonNgu"));
  // }, []);

  const { baiVietData, isDataLoading, fetchData, isFetching } =
    useGetDataBaiViet("0", "0");

  const {
    baiVietDataDetail,
    isDataDetailLoading,
    fetchData: fetchDetail,
    isFetching: isFetchingDetail,
  } = useGetDetailBaiViet("0", "0", dataEdit?._id);

  const { mutate, isLoading: isLoadingDelete } = useDeleteBaiViet();

  // Method
  const handleAdd = () => {
    setIsModalOpen({
      open: true,
      initData: null,
    });
  };

  // const handleAdd = () => {
  //   onShowSlice({
  //     open: true,
  //     initData: null,
  //   });
  // };

  const handleEdit = (data) => {
    setDataEdit(data);
    setIsModalEditOpen(true);
  };

  const handleDelete = async (data) => {
    console.log("data", data);
    await dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          await mutate({
            Data: data,
            onSuccess: async (res) => {
              toast.success(res.data.message);
              await fetchData();
              await dispatch(
                setConfirm({
                  status: "close",
                  method: () => {},
                })
              );
            },
            onError: (err) => {
              toast.error(err.error.message);
            },
          });
        },
      })
    );
  };

  const handleViewDanhGia = (data) => {
    setDataEdit(data);
    setIsModalEditReaction(true);
  };

  useLoadingEffect(isDataLoading || isDataDetailLoading || isLoadingDelete);

  return (
    <>
      <div className="h-[12%] flex justify-between items-center">
        <h3 className="text-[20px] text-[#3790c7] font-bold">
          {t("Quản lý bài viết")}
        </h3>
        <button
          className="flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
          type="submit"
          onClick={handleAdd}
        >
          {t("add")}
        </button>
      </div>
      <div className="h-[88%]">
        <TableMain
          data={baiVietData}
          columns={columns(handleViewDanhGia)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <ModalEditBaiViet
        methodCancel={() => {
          setDataEdit(null);
          setIsModalEditOpen(false);
        }}
        title={t("Sửa bài viết")}
        isOpen={isModalEditOpen}
        dataEdit={baiVietDataDetail}
        fetcher={fetchDetail}
        fetch={fetchData}
        childrenForm={<></>}
      />
      <ModalCreateBaiViet
        methodCancel={() => {
          setDataEdit(null);
          setIsModalOpen(false);
        }}
        title={t("Thêm bài viết")}
        isOpen={isModalOpen}
        fetcher={fetchDetail}
        fetch={fetchData}
      />
      <ModalEditReaction
        isOpen={isModalEditReaction}
        methodCancel={() => setIsModalEditReaction(false)}
        title={t("Edit Reaction")}
        idRoom={dataEdit?.id}
      />
      <Confirm />
    </>
  );
};
