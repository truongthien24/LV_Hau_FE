import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import FormNumberPhone from "page/admin/shareComponent/form/FormNumberPhone";
import FormSelect from "page/admin/shareComponent/form/FormSelect";
import useUpdateDonHang from "../hook/useUpdateDonHang";
import useCreateDonHang from "../hook/useCreateDonHang";
import FormDateFuture from "page/admin/shareComponent/form/FormDateFuture";
import FormDatePicker from "page/admin/shareComponent/form/FormDatePicker";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateDonHang();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateDonHang();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      thongTinGiaoHang: {
        thongTinNguoiNhan: {
          tenNguoiNhan: "",
        },
      },
      thongTinGiaoHang: {
        thongTinNguoiNhan: {
          sdt: "",
        },
      },
      thongTinGiaoHang: {
        thongTinNguoiNhan: {
          diaChi: "",
        },
      },
    },
    // { tenNhaCungCap: "" },
    // { diaChiNhaCungCap: "" },
    // { soDienThoai: "" }
    // resolver: yupResolver(
    //   yup.object().shape({
    //     tenNhaCungCap: yup.string().required("Nhập tên nhà cung cấp vào đi"),
    //     diaChiNhaCungCap: yup
    //       .string()
    //       .required("Nhập địa chỉ nhà cung cấp vào đi"),
    //     soDienThoai: yup
    //       .number()
    //       .required({ message: "Nhập số điện thoại vào đi" })
    //       .test("kiemtradodai", "Số điện thoại 10 hoặc 11 số thui!", (data) => {
    //         if (data.toString().length >= 9 && data.toString().length <= 10) {
    //           return true;
    //         }
    //         return false;
    //       }),
    //   })
    // ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = method;

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(data);
    }
  }, [data]);

  useEffect(() => {
    if (showSlice) {
      if (!_.isEmpty(data)) {
        reset(data);
      } else {
        reset({
          thongTinGiaoHang: {
            thongTinNguoiNhan: {
              tenNguoiNhan: "",
            },
          },
          thongTinGiaoHang: {
            thongTinNguoiNhan: {
              sdt: "",
            },
          },
          thongTinGiaoHang: {
            thongTinNguoiNhan: {
              diaChi: "",
            },
          },
          maDonHang: "",
        });
        // { tenNhaCungCap: "" },
        // { diaChiNhaCungCap: "" },
        // { soDienThoai: "" }
      }
    }
  }, [showSlice]);

  useEffect(() => {
    return () => reset();
  }, []);

  const submitForm = async (data) => {
    if (showSlice?.initData?._id) {
      await mutateUpdate({
        Data: data,
        onSuccess: async (res) => {
          toast.success(res?.data?.message);
          fetcher();
          fetchDetail();
          // onShowSlice({
          //   open: false,
          //   initData: null,
          // });
        },
        onError: async (error) => {
          toast.error(error?.error?.message);
        },
      });
    } else {
      await mutate({
        Data: data,
        onSuccess: async (res) => {
          toast.success(res?.data?.message);
          fetcher();
          onShowSlice((prev) => {
            return { ...prev, open: false, initData: null };
          });
        },
        onError: async (error) => {
          toast.error(error?.error?.message);
        },
      });
    }
  };

  // useLoadingEffect(isSubmitting || isSubmittingUpdate);

  return (
    <FormProvider {...method}>
      <form
        className="grid grid-cols-3 gap-[10px]"
        onSubmit={handleSubmit(submitForm)}
      >
        {/* Có 3 cột */}
        <div className="col-span-1">
          <FormTextField
            label="Mã đơn hàng"
            name="maDonHang"
            errors={errors}
            required
            control={control}
            disable={true}
          />
        </div>

        <div className="col-span-1">
          <FormTextField
            label="Tên người nhận"
            name="thongTinGiaoHang.thongTinNguoiNhan.tenNguoiNhan"
            errors={errors}
            required
            control={control}
            disable={watch("tinhTrang") > 1}
          />
        </div>
        <div className="col-span-1">
          <FormNumberPhone
            label="Số điện thoại"
            name="thongTinGiaoHang.thongTinNguoiNhan.sdt"
            errors={errors}
            required
            minLength={9}
            maxLength={10}
            control={control}
            disabled={watch("tinhTrang") > 1}
          />
        </div>
        <div className="col-span-2">
          <FormTextField
            label="Địa chỉ nhận hàng"
            name="thongTinGiaoHang.thongTinNguoiNhan.diaChi"
            errors={errors}
            required
            control={control}
            disable={watch("tinhTrang") > 1}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            label="Tình trạng"
            name="tinhTrang"
            errors={errors}
            required
            disable={watch("tinhTrang") >= 2 && watch("tinhTrang") != 3}
            option={[
              {
                label: "Đang xác nhận",
                value: 0,
                disabled: watch("tinhTrang") > 0,
              },
              {
                label: "Đang giao",
                value: 1,
                disabled: watch("tinhTrang") > 1,
              },
              {
                label: "Đã giao",
                value: 2,
                disabled: watch("tinhTrang") > 2,
              },
              {
                label: "Đang trả hàng",
                value: 3,
                disabled: watch("tinhTrang") > 2,
              },
              {
                label: "Đã trả hàng",
                value: 4,
                disabled: watch("tinhTrang") === 5,
              },
              {
                label: "Đã hủy",
                value: 5,
                disabled: watch("tinhTrang") >= 1,
              },
            ]}
            control={control}
          />
        </div>
        <div className="col-span-1">
          <FormDateFuture
            control={control}
            errors={errors}
            name="ngayGiao"
            label="Ngày giao"
            disabled={watch("tinhTrang") != 1 && watch("tinhTrang") != 2}
            required
            max={new Date()}
          />
        </div>
        <div className="col-span-1">
          <FormDateFuture
            control={control}
            errors={errors}
            disabled
            name="thongTinTraHang.ngayBatDau"
            label="Ngày bắt đầu trả hàng"
          />
        </div>
        <div className="col-span-1">
          <FormDateFuture
            control={control}
            disabled={watch("tinhTrang") != 4}
            errors={errors}
            name="thongTinTraHang.ngayKetThuc"
            label="Ngày trả hàng kết thúc"
          />
        </div>
        <div className="col-span-3 mt-[20px]">
          <CustomButton
            label="Lưu"
            type="submit"
            // loading={isSubmitting || isSubmittingUpdate}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Details;
