import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import useUpdateTacGia from "../hook/useUpdateGiamGia";
import useCreateGiamGia from "../hook/useCreateGiamGia";
import useUpdateGiamGia from "../hook/useUpdateGiamGia";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateGiamGia();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateGiamGia();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      tenMaGiamGia: "",
      phanTramGiamGia: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        tenMaGiamGia: yup.string().required("Nhập tên vào đi"),
        phanTramGiamGia: yup
          .number()
          .required("Nhập % vào đi")
          .typeError("Phải nhập % vào"),
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
        reset({ tenTacGia: "" }, { chiTietTacGia: "" });
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
            label="Tên mã giảm giá"
            name="tenMaGiamGia"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-2">
          <FormTextField
            label="Phần trăm giảm giá"
            name="phanTramGiamGia"
            errors={errors}
            required
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
