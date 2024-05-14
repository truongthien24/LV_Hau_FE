import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import useUpdateNhaCungCap from "../hook/useUpdateNhaCungCap";
import useCreateNhaCungCap from "../hook/useCreateNhaCungCap";
import FormNumberPhone from "page/admin/shareComponent/form/FormNumberPhone";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateNhaCungCap();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateNhaCungCap();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      tenNhaCungCap: "",
      diaChiNhaCungCap: "",
      soDienThoai: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        tenNhaCungCap: yup.string().required("Nhập tên nhà cung cấp vào đi"),
        diaChiNhaCungCap: yup
          .string()
          .required("Nhập địa chỉ nhà cung cấp vào đi"),
        soDienThoai: yup
          .number()
          .required({ message: "Nhập số điện thoại vào đi" })
          .test("kiemtradodai", "Số điện thoại 10 hoặc 11 số thui!", (data) => {
            if (data.toString().length >= 9 && data.toString().length <= 10) {
              return true;
            }
            return false;
          }),
      })
    ),
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
        reset(
          { tenNhaCungCap: "" },
          { diaChiNhaCungCap: "" },
          { soDienThoai: "" }
        );
      }
    }
  }, [showSlice]);

  useEffect(() => {
    return () => reset();
  }, []);

  const submitForm = async (data) => {
    console.log("data", data);
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

  useLoadingEffect(isSubmitting || isSubmittingUpdate);

  return (
    <FormProvider {...method}>
      <form
        className="grid grid-cols-3 gap-[5px]"
        onSubmit={handleSubmit(submitForm)}
      >
        {/* Có 3 cột */}
        <div className="col-span-1">
          <FormTextField
            label="Tên nhà cung cấp"
            name="tenNhaCungCap"
            errors={errors}
            required
            control={control}
          />
        </div>

        <div className="col-span-2">
          <FormTextField
            label="Địa chỉ nhà cung cấp"
            name="diaChiNhaCungCap"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-3">
          <FormNumberPhone
            label="Số điện thoại nhà cung cấp"
            name="soDienThoai"
            errors={errors}
            required
            minLength={9}
            maxLength={10}
            control={control}
          />
        </div>
        <CustomButton
          label="Lưu"
          type="submit"
          loading={isSubmitting || isSubmittingUpdate}
        />
      </form>
    </FormProvider>
  );
};

export default Details;
