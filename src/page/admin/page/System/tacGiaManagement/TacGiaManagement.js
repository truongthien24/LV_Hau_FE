import { Confirm } from "component/Confirm/Confirm";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import { TableMain } from "page/admin/shareComponent/table/TableMain";
import PopupMain from "page/user/shareComponent/Popup/PopupMain";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
import Details from "./component/Details";
import { columns } from "./helper";
import useGetDataTacGia from "./hook/useGetDataTacGia";
import useGetDetailTacGia from "./hook/useGetDetailTacGia";
import useDeleteTacGia from "./hook/useDeleteTacGia";
import { CellModal } from "page/admin/shareComponent/modal/CellModal";
import { ChiTiet } from "page/admin/shareComponent/modal/ModalChiTiet";

const TacGiaManagement = () => {
  // State
  const [showSlice, onShowSlice] = useState({ open: false, initData: {} });
  const [isOpenChiTietTacGia, setIsOpenChiTietTacGia] = useState({
    open: false,
    selector: {},
  });

  const onOpenChiTietTacGia = (state) => {
    setIsOpenChiTietTacGia(state);
  };

  const columnsTable = useMemo(() => {
    return columns(onOpenChiTietTacGia);
  }, []);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  // Get Data
  const { tacGiaData, isDataLoading, fetchData, isFetching } = useGetDataTacGia(
    "0",
    "0"
  );

  const {
    tacGiaDataDetail,
    isDataDetailLoading,
    fetchData: fetchDataDetail,
    isFetching: isFetchDetail,
  } = useGetDetailTacGia("0", "0", showSlice?.initData?._id);

  const { mutate: mutateDelete, isLoading: isSubmittingDelete } =
    useDeleteTacGia();

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

  const handleDelete = async (data) => {
    await dispatch(
      setConfirm({
        status: "open",
        method: async () =>
          await mutateDelete({
            Data: { _id: data?._id },
            onSuccess: async (res) => {
              toast.success(res?.data?.message);
              fetchData();
              dispatch(
                setConfirm({
                  status: "close",
                  method: () => {},
                })
              );
            },
            onError: async (error) => {
              toast.error(error?.message);
            },
          }),
      })
    );
  };

  useLoadingEffect(isDataLoading || isDataDetailLoading || isSubmittingDelete);

  return (
    <>
      <div className="h-[12%] flex justify-between items-center">
        <h3 className="text-[20px] text-[#3790c7] font-bold">
          {t("Quản lý tác giả")}
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
          data={tacGiaData}
          columns={columnsTable}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <PopupMain
        title={
          _.isEmpty(showSlice?.initData?._id) ? "Thêm Tác Giả" : "Sửa tác giả"
        }
        showSlice={showSlice}
        onShowSlice={onShowSlice}
        fullWidth
        children={
          <>
            <Details
              data={tacGiaDataDetail}
              fetcher={fetchData}
              fetchDetail={fetchDataDetail}
              showSlice={showSlice}
              onShowSlice={onShowSlice}
            />
          </>
        }
      />
      <CellModal
        open={isOpenChiTietTacGia?.open}
        onCancel={() => {
          onOpenChiTietTacGia({
            open: false,
            selector: null,
          });
        }}
        title="Chi Tiết tác giả"
        children={<ChiTiet data={isOpenChiTietTacGia?.selector} />}
      />
      <Confirm />
    </>
  );
};

export default TacGiaManagement;
