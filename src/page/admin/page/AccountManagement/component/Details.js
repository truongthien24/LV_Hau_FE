import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormNumberPhone from "page/admin/shareComponent/form/FormNumberPhone";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import useUpdateAccount from "../hook/useUpdateAccount";
import useRegister from "page/user/page/register/hook/useRegister";
import FormSelect from "page/admin/shareComponent/form/FormSelect";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useRegister();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateAccount();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {},
    resolver: yupResolver(yup.object().shape({})),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
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
        reset();
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

  const disable = getValues('loaiTaiKhoan') === "admin"

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
            label="Tên đăng nhập"
            name="tenDangNhap"
            errors={errors}
            required
            control={control}
          />
        </div>

        <div className="col-span-1">
          <FormTextField
            label="Email"
            name="email"
            errors={errors}
            required
            control={control}
            disable={true}
          />
        </div>

        <div className="col-span-1">
          <FormSelect
            label="Xác thực email"
            name="xacThucEmail"
            errors={errors}
            control={control}
            disable={disable}
            option={[
              {
                label: "Chưa xác nhận",
                value: false,
              },
              {
                label: "Đã xác nhận",
                value: true,
              },
            ]}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            label="Loại tài khoản"
            name="loaiTaiKhoan"
            errors={errors}
            control={control}
            // disable={disable}
            option={[
              {
                label: "Khách hàng",
                value: "user",
              },
              {
                label: "Quản trị viên",
                value: "admin",
              },
            ]}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            label="Báo xấu"
            name="baoXau"
            errors={errors}
            control={control}
            disable={disable}
            option={[
              {
                label: "Tốt",
                value: false,
              },
              {
                label: "Xấu",
                value: true,
              },
            ]}
          />
        </div>
        <div className="col-span-3 mt-[20px]">
          <CustomButton
            label="Lưu"
            type="submit"
            loading={isSubmitting || isSubmittingUpdate}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Details;
