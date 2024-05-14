import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useChangePassword from "page/admin/page/AccountManagement/hook/useChangePassword";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const ModalUpdatePassword = ({ open, onOpen, title, data }) => {
  const { mutate, isLoading } = useChangePassword();

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      matKhauHienTai: "",
      matKhauMoi: "",
      matKhauMoiXacNhan: "",
      confirmCurrentPass: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        matKhauHienTai: yup.string().required("Nhập vào mật khẩu hiện tại"),
        matKhauMoi: yup
          .string()
          .required("Nhập vào mật khẩu hiện mới")
          .min(6, "Không được nhập dưới 6"),
        matKhauMoiXacNhan: yup
          .string()
          .required("Nhập vào mật khẩu xác nhận")
          .oneOf([yup.ref("matKhauMoi")], "Không chính xác"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = method;

  const handleChangePassword = async (dataForm) => {
    await mutate({
      Data: {
        ...dataForm,
        id: data?._id,
      },
      onSuccess: (res) => {
        toast.success(res.data.message);
        reset();
        onOpen();
      },
      onError: (err) => {
        toast.error(err.error.message);
      },
    });
  };

  useLoadingEffect(isLoading);

  return (
    <Modal
      className="!w-[90%] xl:!w-[50%]"
      open={open}
      onCancel={() => {
        onOpen({
          open: false,
        });
      }}
      footer={null}
      title={title}
    >
      <FormProvider {...method}>
        <form
          className="grid grid-cols-1 gap-[20px] p-[10px]"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className="w-full">
            <FormTextField
              control={control}
              name="matKhauHienTai"
              label="Mật khẩu hiện tại"
              required
              errors={errors}
              type="password"
            />
          </div>
          <div className="w-full">
            <FormTextField
              control={control}
              name="matKhauMoi"
              label="Mật khẩu mới"
              type="password"
              required
              errors={errors}
            />
          </div>
          <div className="w-full">
            <FormTextField
              control={control}
              name="matKhauMoiXacNhan"
              label="Nhập lại mật khẩu mới"
              type="password"
              required
              errors={errors}
            />
          </div>
          <div className="flex items-center justify-center">
            <CustomButton label="Lưu" type="submit" loading={isLoading} />
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalUpdatePassword;
