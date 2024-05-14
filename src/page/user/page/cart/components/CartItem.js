import { Button, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SearchOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
import { toast } from "react-hot-toast";
import FormSelect from "page/admin/shareComponent/form/FormSelect";
import { getPercentRent } from "method/getPercentRent";
import useDeleteSanPhamKhoiGioHang from "page/admin/page/GioHangManagement/hook/useDeleteSanPhamGioHang";

const CartItem = ({ arrayData, data, columns, isEdit, gioHang }) => {
  const { getValues, watch, setValue, register } = useFormContext();

  const dispatch = useDispatch();
  const { mutate, isLoading } = useDeleteSanPhamKhoiGioHang();
  useEffect(() => {
    if (!_.isEmpty(data)) {
      // reset({ ...data.sach, soLuongGioHang: data.soLuong });
    }
  }, [data]);

  const indexItem = useMemo(() => {
    if (arrayData) {
      return arrayData?.findIndex((i) => i === data);
    }
  }, [arrayData]);

  const handleChangeQuantity = (method) => {
    const soLuong = `danhSach[${indexItem}].soLuong`;
    let preValue = getValues(soLuong);
    switch (method) {
      case "minas": {
        setValue(soLuong, --preValue);
        break;
      }
      case "plus": {
        setValue(soLuong, ++preValue);
        break;
      }
    }
  };

  const deleteItemCart = async (data) => {
    await dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          // await mutate({
          //   Data: { id: gioHang._id, sachId: data },
          //   onSuccess: (res) => {
          //     toast.success(res?.data?.message);
          //   },
          //   onError: (error) => {
          //     toast.error(error?.error?.message);
          //   },
          // });
          const danhSach = watch("danhSach");
          const newDanhSach = danhSach?.filter(
            (sach) => sach.sach._id != data._id
          );
          setValue("danhSach", newDanhSach);
          dispatch(
            setConfirm({
              status: "close",
              method: null,
            })
          );
        },
      })
    );
  };

  // trả về hiển thị
  return (
    <div className="flex items-center justify-between w-full">
      {columns?.map((item, index) => {
        if (item.visible) {
          switch (item.name) {
            case "thongTinSanPham": {
              return (
                <div className="flex" style={{ width: `${item.width}` }}>
                  <img
                    src={data?.sach?.hinhAnh?.url}
                    className="h-full w-[50px] md:w-[100px] mr-[10px] md:mr-[25px]"
                  />
                  <div>
                    <h4 className="max-w-[300px] text-[12.5px] md:text-[15px]">
                      {data?.sach?.tenSach}
                    </h4>
                  </div>
                </div>
              );
            }
            case "soLuong": {
              return (
                <div
                  className="flex items-center justify-center my-[10px]"
                  style={{ width: `${item.width}` }}
                >
                  <div className="flex items-center justify-center">
                    {isEdit ? (
                      <>
                        <button
                          type="button"
                          className="bg-[#dcdbdb] w-[20px] h-[20px] md:w-[35px] md:h-[35px] flex items-center justify-center"
                          // khóa nút đó lại khi thỏa mãn điều kiện
                          disabled={
                            watch(`danhSach[${indexItem}].soLuong`) === 1
                          }
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
                          className="bg-[white] text-[11px] md:text-[13px] w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-center"
                          disabled
                          // value={data?.soLuong}
                          // đăng ký vào form
                          {...register(`danhSach[${indexItem}].soLuong`)}
                        />
                        <button
                          type="button"
                          className="bg-[#dcdbdb] w-[20px] h-[20px] md:w-[35px] md:h-[35px] flex items-center justify-center"
                          onClick={() => handleChangeQuantity("plus")}
                          disabled={
                            watch(`danhSach[${indexItem}].soLuong`) ===
                            data?.sach?.soLuong
                          }
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
                      </>
                    ) : (
                      <span className="text-[11px] md:text-[13px]">
                        {data?.soLuong}
                      </span>
                    )}
                  </div>
                </div>
              );
            }
            case "giaThue": {
              return (
                <div
                  className="flex justify-center items-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  <FormSelect
                    disable={!isEdit}
                    className="mb-[5px]"
                    name={`danhSach[${indexItem}].soNgayThue`}
                    onChangeForm={(e) => {
                      // setValue(
                      //   `danhSach[${indexItem}].giaThue`,
                      //   getPercentRent(parseInt(e)) * data?.sach?.gia
                      // );
                      const danhSach = watch("danhSach");
                      danhSach.forEach((sach, indexSach) => {
                        setValue(
                          `danhSach[${indexSach}].soNgayThue`,
                          parseInt(e)
                        );
                        setValue(
                          `danhSach[${indexSach}].giaThue`,
                          getPercentRent(parseInt(e)) * sach?.sach?.gia
                        );
                      });
                    }}
                    option={[
                      { value: 7, label: "7 ngày" },
                      { value: 14, label: "14 ngày" },
                      { value: 30, label: "30 ngày" },
                    ]}
                  />
                  <span className="ml-[10px]">
                    {watch(`danhSach[${indexItem}].giaThue`)?.toLocaleString()}
                  </span>
                </div>
              );
            }
            case "gia": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  {data?.sach?.tienCoc?.toLocaleString()}
                </div>
              );
            }
            case "action": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  <Tooltip
                    title="Xoá"
                    onClick={() => deleteItemCart(data?.sach)}
                  >
                    <Button
                      type="delete"
                      shape="circle"
                      icon={<DeleteFilled />}
                    />
                  </Tooltip>
                </div>
              );
            }
            case "thanhTien": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  {(
                    parseInt(data?.sach?.tienCoc) * parseInt(data?.soLuong) +
                    watch(`danhSach[${indexItem}].giaThue`) *
                      parseInt(data?.soLuong)
                  )?.toLocaleString()}
                </div>
              );
            }
          }
        }
      })}
    </div>
  );
};

export default CartItem;
