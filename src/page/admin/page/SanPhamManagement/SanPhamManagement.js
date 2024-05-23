import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Confirm } from "../../../../component/Confirm/Confirm";
import { TableMain } from "../../shareComponent/table/TableMain";
import { useDispatch } from "react-redux";
import { columns } from "./helper";
import { getCommonCode } from "redux/action/getCommonCode";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { setConfirm } from "redux/action/homeAction";
import toast from "react-hot-toast";
import useGetDataSanPham from "./hook/useGetDataSanPham";
import { ModalCreateSanPham } from "./modal/ModalCreateSanPham";
import { ModalEditSanPham } from "./modal/ModalEditSanPham";
import useDeleteSanPham from "./hook/useDeleteSanPham";
import useGetDetailSanPham from "./hook/useGetDetailSanPham";

export const SanPhamManagement = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Somethings
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Effect
  useEffect(async () => {
    // await dispatch(getCommonCode("tacGia"));
    // await dispatch(getCommonCode("theLoai"));
    // await dispatch(getCommonCode("nhaXuatBan"));
    // await dispatch(getCommonCode("nhaCungCap"));
    // await dispatch(getCommonCode("ngonNgu"));
    // await dispatch(getCommonCode("giamGia"));
  }, []);

  const { sanPhamData, isDataLoading, fetchData, isFetching } = useGetDataSanPham(
    "0",
    "0"
  );

  const {
    sanPhamDataDetail,
    isDataDetailLoading,
    fetchData: fetchDetail,
    isFetching: isFetchingDetail,
  } = useGetDetailSanPham("0", "0", dataEdit?._id);

  const { mutate, isLoading: isLoadingDelete } = useDeleteSanPham();

  // Method
  const handleAdd = () => {
    setIsModalOpen({
      open: true,
      initData: null,
    });
  };

  const handleEdit = (data) => {
    setDataEdit(data);
    setIsModalEditOpen(true);
  };

  const handleDelete = async (data) => {
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

  useLoadingEffect(isDataLoading);

  return (
    <>
      <div className="h-[10%] flex justify-between items-center">
        <h3 className="text-[20px] text-[#3790c7] font-bold">
          {t("Quản lý sản phẩm")}
        </h3>
        <button
          className="flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
          type="submit"
          onClick={handleAdd}
        >
          {t("add")}
        </button>
      </div>
      <div className="h-[90%]">
        <TableMain
          data={sanPhamData}
          columns={columns()}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <ModalEditSanPham
        methodCancel={() => {
          setDataEdit(null);
          setIsModalEditOpen(false);
        }}
        title={t("Sửa sản phẩm")}
        isOpen={isModalEditOpen}
        dataEdit={sanPhamDataDetail}
        fetcher={fetchDetail}
        fetch={fetchData}
        childrenForm={<></>}
      />
      <ModalCreateSanPham
        methodCancel={() => {
          setDataEdit(null);
          setIsModalOpen(false);
        }}
        title={t("Thêm sản phẩm")}
        isOpen={isModalOpen}
        // fetcher={fetchDetail}
        fetch={fetchData}
      />
      <Confirm />
    </>
  );
};
